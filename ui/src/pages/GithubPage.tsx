import Fab from "@material-ui/core/Fab";
import GitHub from "@material-ui/icons/GitHub";
import Paper from "@material-ui/core/Paper";
import React from "react";
import ReactMarkdown from "react-markdown";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";

const toRequestUrl = ({
  org,
  project,
  branch = "master",
  file = "README.md"
}: GithubProject) =>
  `https://raw.githubusercontent.com/${org}/${project}/${branch}/${file}`;

export interface GithubProject {
  org: string;
  project: string;
  branch?: string;
  file?: string;
}

export interface RemoteMarkdownProps {
  opts?: RequestInit;
  onError?: (error: Error) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 2, 10, 2),
    overflowWrap: "break-word",
    overflowX: "auto",
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  icon: {
    margin: theme.spacing(0, 1, 0, 0)
  }
}));

export default function RemoteMarkdown({
  opts,
  onError = error => console.error(error)
}: RemoteMarkdownProps) {
  const [mdString, setMdString] = React.useState<string | undefined>(undefined);
  const { githubOrg, githubProject } = useParams();

  React.useEffect(() => {
    let cancelled = false;
    if (githubOrg && githubProject) {
      const url = toRequestUrl({ org: githubOrg, project: githubProject });
      fetch(url, opts)
        .then(
          resp =>
            resp.ok ? resp.text() : `Error retrieving info: [${url}](${url})`,
          onError
        )
        .then(text => !cancelled && text && setMdString(text));
    }

    return () => {
      cancelled = true;
    };
  }, [githubOrg, githubProject, opts, onError]);

  const classes = useStyles();
  const link = `https://github.com/${githubOrg}/${githubProject}`;
  const onClickGithubLink = () =>
    window.open(
      link,
      "_blank",
      "noopener"
    );

  return (
    <Paper className={classes.root}>
      <Fab
        color="primary"
        aria-label="github link"
        title={`Open ${link}`}
        variant="extended"
        className={classes.fab}
        onClick={onClickGithubLink}
      >
        <GitHub className={classes.icon} />
        {`${githubOrg}/${githubProject}`}
      </Fab>
      <ReactMarkdown source={mdString} />
    </Paper>
  );
}
