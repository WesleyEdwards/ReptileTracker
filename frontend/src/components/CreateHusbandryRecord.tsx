import { FC, useContext, useState } from "react";
import { CreateHusbandryBody } from "../api/apiTypes";
import { initialHusbandryRecord } from "../utils/constants";
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

type CreateHusbandryRecordProps = {
  refreshHusbandryRecordList: () => void;
  reptileId: number;
};

export const CreateHusbandryRecord = (props: CreateHusbandryRecordProps) => {
  const { refreshHusbandryRecordList, reptileId } = props;
  const { api } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [husbandryRecord, setHusbandryRecord] = useState(
    initialHusbandryRecord
  );

  if (!reptileId) throw new Error("reptileId is undefined");

  const handleClose = () => {
    setOpen(false);
    setError(undefined);
    setHusbandryRecord(initialHusbandryRecord);
  };

  const validInput = () => {
    return Object.values(husbandryRecord).every((value) => value !== undefined);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setHusbandryRecord((prevState) => ({
      ...prevState,
      [name]: parseInt(value) ?? undefined,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validInput()) {
      setError("Please fill out all fields");
      return;
    }

    await api.createHusbandryRecord(
      reptileId,
      husbandryRecord as CreateHusbandryBody
    );
    refreshHusbandryRecordList();
    handleClose();
  };

  const makeTextFieldProps = (name: keyof CreateHusbandryBody) => ({
    name,
    label: name[0].toUpperCase() + name.slice(1),
    value: husbandryRecord[name],
    fullWidth: true,
    type: "number",
    placeholder: "0",
    onChange: handleInputChange,
  });

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Create Husbandry Record
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create Husbandry Record</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} paddingY={2}>
              <TextField {...makeTextFieldProps("humidity")} />
              <TextField {...makeTextFieldProps("length")} />
              <TextField {...makeTextFieldProps("temperature")} />
              <TextField {...makeTextFieldProps("weight")} />
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
