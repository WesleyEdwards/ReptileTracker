import { FC, useContext, useState } from "react";
import { CreateFeedingBody } from "../api/apiTypes";
import { initialFeedingRecord } from "../utils/constants";
import { AuthContext } from "../context/AuthContext";
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

type CreateFeedingProps = {
  refreshFeedingList: () => void;
  reptileId: number;
};

export const CreateFeeding = (props: CreateFeedingProps) => {
  const { refreshFeedingList, reptileId } = props;
  const { api } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [feeding, setFeeding] =
    useState<CreateFeedingBody>(initialFeedingRecord);

  const handleClose = () => {
    setOpen(false);
    setError(undefined);
    setFeeding(initialFeedingRecord);
  };

  const validInput = () => {
    if (!feeding.foodItem) return false;
    if (!reptileId) return false;
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validInput()) {
      setError("Please fill out all fields");
      return;
    }

    await api.createFeeding(reptileId, feeding);
    refreshFeedingList();
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
                value={feeding.foodItem}
                onChange={(event) => {
                  setFeeding({ ...feeding, foodItem: event.target.value });
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
