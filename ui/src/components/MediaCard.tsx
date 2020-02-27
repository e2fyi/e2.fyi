import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/icons/Link";

export interface MediaCardProps {
  image?: string;
  title?: string;
  desc?: string;
  onClick?: React.MouseEventHandler;
  pathname?: string;
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      maxWidth: 600,
      minHeight: 175
    },
    details: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1
    },
    content: {
      flex: "1 0 auto"
    },
    cover: {
      width: 151,
      minWidth: 151
    },
    controls: {
      display: "flex",
      alignItems: "center",
      flexGrow: 1,
      justifyContent: "flex-end",
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    playIcon: {
      height: 38,
      width: 38
    }
  })
);

export default function MediaCard({
  title,
  image,
  desc,
  onClick,
  pathname
}: MediaCardProps) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={image}
        title={title || image}
      />
      <CardActionArea onClick={onClick}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {title} <Link alignmentBaseline="middle" color="primary" onClick={onClick} />
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {desc}
            </Typography>
          </CardContent>
        </div>
        <div className={classes.controls}>
          {onClick ? (
            <CardActions>
              <Typography
                color="textSecondary"
                variant="caption"
              >{`${window.location.origin}${pathname}`}</Typography>
              {/* <Button size="small" color="primary" onClick={onClick}>
                Goto
              </Button> */}
            </CardActions>
          ) : null}
        </div>
      </CardActionArea>
    </Card>
  );
}
