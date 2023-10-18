import { FC, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Stack,
  Alert,
} from "@mui/material";
import { Feeding } from "../../api/models";
import { useToast } from "../Toaster";
import { useReptileContext } from "../reptile/ReptileContext";

export const CreateFeeding = () => {
  const { addInfo, reptile } = useReptileContext();

  const { api } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [feeding, setFeeding] = useState<string>("");

  const toast = useToast();

  const handleClose = () => {
    setOpen(false);
    setError(undefined);
    setFeeding("");
  };

  const validInput = () => {
    if (!feeding) return false;
    return true;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validInput()) {
      setError("Please fill out all fields");
      return;
    }

    const newFeeding: Feeding = {
      _id: crypto.randomUUID(),
      reptile: reptile._id,
      foodItem: feeding,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addInfo("feedings", newFeeding);

    api.feeding.create(newFeeding).catch((e) => {
      toast("Error creating feeding", "error");
    });

    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Create Feeding
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create Feeding</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} paddingY={2}>
              <TextField
                placeholder="Bacon"
                label="Food Item"
                value={feeding}
                onChange={(event) => {
                  setFeeding(event.target.value);
                }}
              />
            </Stack>

            {error && (
              <Alert sx={{ my: 2 }} severity="error">
                {error}
              </Alert>
            )}

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
