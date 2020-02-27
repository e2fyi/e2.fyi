import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ClipboardJS from "clipboard";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/icons/Link";
import MonacoEditor, { EditorConstructionOptions } from "react-monaco-editor";
import Paper from "@material-ui/core/Paper";
import React from "react";
import setupMonaco, { schemas } from "../lib/monaco";
import store, { setError, setMsg } from "../redux";
import Typography from "@material-ui/core/Typography";
import { deserializeVegaSpec, serializeVegaSpec } from "../lib/serialization";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { Vega } from "react-vega";
import { vegaLiteExampleSpec } from "../lib/vega-examples";
import { View } from "vega";
import { VisualizationSpec } from "vega-embed";
import { CardActionArea } from "@material-ui/core";
import { apiVegaLink } from "../lib/apis";

// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  card: {
    padding: theme.spacing(2),
    flexGrow: 1
    //overflowWrap: "break-word"
  },
  ellipsis: {
    padding: theme.spacing(2, 4),
    flexGrow: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }
}));

const defaultCode: string = JSON.stringify(
  { $schema: schemas[1].uri },
  null,
  2
);

export const VegaLinkPage: React.FC<{ path: string }> = ({ path }) => {
  const [editor, setEditor] = React.useState<any | undefined>(undefined);
  const [code, setCode] = React.useState<string>(defaultCode);
  const [queryCode, setQueryCode] = React.useState<string | undefined>(
    undefined
  );
  const [spec, setSpec] = React.useState<VisualizationSpec | undefined>(
    undefined
  );
  const [serializedSpec, setSerializedSpec] = React.useState<string>("");
  const [quickLink, setQuickLink] = React.useState<string>("");
  const [apiLink, setApiLink] = React.useState<string>("");
  const [errorMsg, setErrorMsg] = React.useState<string | undefined>(undefined);
  const location = useLocation();
  const history = useHistory();
  const query = new URLSearchParams(location.search);
  const dispatch = useDispatch<typeof store.dispatch>();

  const format = () =>
    setTimeout(
      () => editor && editor.getAction("editor.action.formatDocument").run(),
      100
    );

  React.useEffect(() => {
    setupMonaco();
    const btn = new ClipboardJS("#copy2clipboard");
    btn.on("success", () => dispatch(setMsg("URL copied to clipboard.")));
    btn.on("error", error => dispatch(setError(error.text)));
    return () => btn.destroy();
  }, [dispatch]);
  React.useEffect(() => {
    try {
      setSpec(JSON.parse(code));
    } catch (error) {
      // do nothing
    }
  }, [code]);
  React.useEffect(() => {
    try {
      setSerializedSpec(serializeVegaSpec(spec));
      setErrorMsg(undefined);
    } catch (error) {
      console.warn(error);
    }
  }, [spec]);
  React.useEffect(() => {
    if (errorMsg) {
      setQuickLink("Quick link");
    } else {
      setQuickLink(`${window.location.origin}${path}?spec=${serializedSpec}`);
      setApiLink(apiVegaLink({ spec: serializedSpec, mode: "img" }));
    }
  }, [serializedSpec, path, errorMsg]);
  React.useEffect(() => {
    const spec_ = query.get("spec");
    if (spec_) {
      try {
        const queryCodeCurr = JSON.stringify(deserializeVegaSpec(spec_));
        if (queryCode !== queryCodeCurr && editor) {
          setQueryCode(queryCodeCurr);
          setCode(queryCodeCurr);
          setTimeout(() => {
            editor.getAction("editor.action.formatDocument").run();
          }, 100);
        }
      } catch (error) {
        console.warn(error);
      }
    }
  }, [query, queryCode, editor]);

  const classes = useStyles();
  const options: EditorConstructionOptions = {
    selectOnLineNumbers: true
  };
  const onChange = (newValue: string, _event: any) => {
    setCode(newValue);
  };
  const editorDidMount = (editor: any, _monaco: any) => {
    setEditor(editor);
    editor.focus();
  };
  const onNewView = (_view: View) => {
    setErrorMsg(undefined);
  };
  const onError = (error: Error) => setErrorMsg(error.message);
  const onReset = () => {
    history.push(path);
    setCode(defaultCode);
    setQueryCode(undefined);
    format();
  };
  const onExample = () => {
    setCode(JSON.stringify(vegaLiteExampleSpec));
    format();
  };

  return (
    <Grid
      container
      direction="row"
      wrap="wrap"
      spacing={2}
      className={classes.root}
    >
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Typography variant="h3">Vega-Link</Typography>
        <Grid container spacing={2}>
          <Grid item xl={8} lg={8} md={6} sm={12} xs={12}>
            <Typography>
              is a simple app that provides an UI to create an interactive
              visualization with Vega or Vega-Lite, which then can be shared or
              embedded with a url.
            </Typography>
          </Grid>
          <Grid item xl={8} lg={8} md={6} sm={12} xs={12} hidden={!!errorMsg}>
            <Typography>Use this link to share this page</Typography>
            <CardActionArea>
              <Typography
                id="copy2clipboard"
                hidden={!!errorMsg}
                color="textSecondary"
                variant="subtitle2"
                className={classes.ellipsis}
                title={quickLink}
                data-clipboard-text={quickLink}
              >
                <Link fontSize="inherit" alignmentBaseline="baseline" />{" "}
                {quickLink}
              </Typography>
            </CardActionArea>
          </Grid>
          <Grid item xl={8} lg={8} md={6} sm={12} xs={12} hidden={!!errorMsg}>
            <Typography>Use this link to embed an image</Typography>
            <CardActionArea>
              <Typography
                id="copy2clipboard"
                color="textSecondary"
                variant="subtitle2"
                className={classes.ellipsis}
                title={apiLink}
                data-clipboard-text={apiLink}
              >
                <Link fontSize="inherit" alignmentBaseline="baseline" />{" "}
                {apiLink}
              </Typography>
            </CardActionArea>
          </Grid>

          <Grid item xl={8} lg={8} md={6} sm={12} xs={12}>
            <ButtonGroup>
              <Button
                color="primary"
                variant="contained"
                aria-label="reset"
                onClick={onReset}
              >
                Reset
              </Button>
              <Button variant="contained" onClick={onExample}>
                Example
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        {/* <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select>
            {schemas.map(schema => (
              <MenuItem value={schema.uri}>{schema.uri}</MenuItem>
            ))}
          </Select>
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl> */}
      </Grid>
      <Grid item xl={8} lg={8} md={6} sm={12} xs={12}>
        <MonacoEditor
          width="100%"
          height="70vh"
          language="json"
          theme="vs-light"
          value={code}
          options={options}
          overrideServices={{ enableSchemaRequest: true }}
          onChange={onChange}
          editorDidMount={editorDidMount}
        />
      </Grid>
      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
        {spec && !errorMsg ? (
          <Vega spec={spec} onNewView={onNewView} onError={onError} />
        ) : null}
        <Paper className={classes.card} hidden={!errorMsg}>
          <Typography color="error" variant="h5">
            Error
          </Typography>
          <Typography paragraph={true} color="error" variant="caption">
            {errorMsg}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default VegaLinkPage;
