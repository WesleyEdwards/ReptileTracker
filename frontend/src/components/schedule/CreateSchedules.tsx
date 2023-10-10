import { useState, useContext, useEffect } from "react";
import { Schedule, Reptile, User, ScheduleType } from "../../api/models";
import { AuthContext } from "../../context/AuthContext";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Stack,
  Alert,
} from "@mui/material";
import { daysList, initialSchedule } from "../../utils/constants";
import { camelToTitleCase } from "../../utils/miscFunctions";

type CreateScheduleForm = Pick<
  Schedule,
  | "type"
  | "description"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"
>;

type CreateScheduleProps = {
  refreshScheduleList: () => void;
  initialReptileId?: string;
};

export const CreateSchedule = (props: CreateScheduleProps) => {
  const { refreshScheduleList, initialReptileId } = props;
  const [schedule, setSchedule] = useState<CreateScheduleForm>(initialSchedule);
  const [reptileID, setReptileID] = useState<string | undefined>(
    initialReptileId
  );
  const [reptiles, setReptiles] = useState<Reptile[]>([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>();
  const { api } = useContext(AuthContext);

  const validInput = [
    schedule.type,
    schedule.description,
    reptileID,
    daysList.some((day) => schedule[day as keyof CreateScheduleForm]),
  ].every((t) => !!t);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSchedule((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSchedule((prevState) => ({ ...prevState, [name]: checked }));
  };

  const handleClose = () => {
    setOpen(false);
    setError(undefined);
    setSchedule(initialSchedule);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(undefined);
    if (!reptileID || !validInput) {
      setError("Please fill out all fields");
      return;
    }
    api.schedule
      .create({
        ...schedule,
        _id: crypto.randomUUID(),
        reptile: reptileID,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .then(() => {
        refreshScheduleList();
        handleClose();
      });
  };

  const getReptiles = () => {
    api.reptile.query({}).then(setReptiles);
  };

  useEffect(() => {
    getReptiles();
  }, []);

  const reptileOptionSelection = () => {
    const reptileOptions = reptiles.map((reptile) => {
      return (
        <MenuItem key={reptile._id} value={reptile._id}>
          {reptile.name}
        </MenuItem>
      );
    });
    return (
      <FormControl fullWidth>
        <InputLabel>Reptile</InputLabel>
        <Select
          label="Reptile"
          value={reptileID?.toString()}
          onChange={(e) => setReptileID(e.target.value)}
        >
          {reptileOptions}
        </Select>
      </FormControl>
    );
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        Create Schedule
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Create Schedule</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack sx={{ py: 2 }} direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  label="Type"
                  name="type"
                  value={schedule.type}
                  onChange={(e) => {
                    setSchedule({
                      ...schedule,
                      type: e.target.value as ScheduleType,
                    });
                  }}
                >
                  <MenuItem value="feed">Feed</MenuItem>
                  <MenuItem value="record">Record</MenuItem>
                  <MenuItem value="clean">Clean</MenuItem>
                </Select>
              </FormControl>
              {!initialReptileId && reptileOptionSelection()}
            </Stack>
            <TextField
              fullWidth
              multiline
              minRows={3}
              name="description"
              label="Description"
              value={schedule.description}
              onChange={handleInputChange}
            />

            <Stack direction="row" flexWrap={"wrap"}>
              {daysList.map((day) => {
                return (
                  <FormControlLabel
                    key={day}
                    control={
                      <Checkbox
                        name={day}
                        checked={!!schedule[day as keyof CreateScheduleForm]}
                        onChange={handleCheckboxChange}
                      />
                    }
                    label={camelToTitleCase(day)}
                  />
                );
              })}
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
