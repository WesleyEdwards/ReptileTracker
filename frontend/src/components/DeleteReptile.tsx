import {
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";

type DeleteReptileProps = {
  handleDelete: () => void;
};

export const DeleteReptile = (props: DeleteReptileProps) => {
  const { handleDelete } = props;
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  return (
    <>
      <Stack
        direction="row"
        width="100%"
        justifyContent="end"
        paddingTop={"8rem"}
      >
        <Button onClick={() => setOpen(true)} color="error">
          Delete Reptile
        </Button>
      </Stack>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Delete Reptile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this reptile? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} variant="outlined" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
