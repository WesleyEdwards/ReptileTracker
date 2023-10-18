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
import { HusbandryRecord } from "../../api/models";
import { initialHusbandryRecord } from "../../utils/constants";
import { useReptileContext } from "../reptile/ReptileContext";
import { useToast } from "../Toaster";

type HusbandryForm = Pick<
  HusbandryRecord,
  "length" | "weight" | "temperature" | "humidity"
>;

export const CreateHusbandryRecord = () => {
  const { addInfo, reptile } = useReptileContext();
  const { api } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [husbandryRecord, setHusbandryRecord] = useState<HusbandryForm>(
    initialHusbandryRecord
  );

  const toast = useToast();

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validInput()) {
      setError("Please fill out all fields");
      return;
    }

    const newHusbandry: HusbandryRecord = {
      _id: crypto.randomUUID(),
      reptile: reptile._id,
      ...husbandryRecord,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addInfo("husbandry", newHusbandry);
    api.husbandry.create(newHusbandry).catch((e) => {
      toast("Error creating feeding", "error");
    });
    handleClose();
  };

  const makeTextFieldProps = (name: keyof HusbandryForm) => ({
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
