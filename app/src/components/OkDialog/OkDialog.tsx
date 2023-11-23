import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface OkDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  message: string;
}

const OkDialog = ({ open, setOpen, title, message }: OkDialogProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button data-cy="OkButton" onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default OkDialog;
