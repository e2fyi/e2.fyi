import IconButton from "@material-ui/core/IconButton";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import React from "react";
import Refresh from "@material-ui/icons/Refresh";
import Snackbar from "@material-ui/core/Snackbar";

export interface ToastProps {
  show: boolean;
  message: string | JSX.Element;
  autoHideDuration?: number;
  severity?: "success" | "info" | "warning" | "error";
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Toast({
  show,
  message,
  autoHideDuration = 6000,
  severity = "info"
}: ToastProps) {
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    setOpen(show);
  }, [show]);

  const handleClose = (
    _event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        action={
          <IconButton
            aria-label="refresh"
            title="reload app"
            color="inherit"
            size="small"
          >
            <Refresh fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
