import * as React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  },
);

interface PositionedSnackbarProps {
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
  severity?: "success" | "info" | "warning" | "error";
  message: string;
  open: boolean;
}

interface State extends PositionedSnackbarProps {
  open: boolean;
}

export default function PositionedSnackbar({
  vertical,
  horizontal,
  severity,
  message,
  open,
}: PositionedSnackbarProps) {
  const [state, setState] = React.useState<State>({
    vertical,
    horizontal,
    severity,
    open,
    message,
  });

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </Box>
  );
}
