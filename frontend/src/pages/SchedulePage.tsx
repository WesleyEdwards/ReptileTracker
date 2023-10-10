import {
  Alert,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import React, { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Schedule } from "../api/models";
import { ErrorMessage } from "../components/ErrorMessage";
import { HeaderTitle } from "../components/HeaderTitle";
import { Spinner } from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";
import { daysList } from "../utils/constants";
import { camelToTitleCase } from "../utils/miscFunctions";

export const SchedulePage: FC = () => {
  const { api } = useContext(AuthContext);
  const { id: scheduleId } = useParams();

  const [schedule, setSchedule] = useState<Schedule | null>();
  const [originalSchedule, setOriginalSchedule] = useState<Schedule>();
  const [error, setError] = useState<string>();
  const [reptileName, setReptileName] = useState<string>();

  if (!scheduleId) {
    return <div>Invalid schedule id</div>;
  }

  const dirty = (() => {
    if (!schedule || !originalSchedule) return false;
    for (const key in schedule) {
      if (
        schedule[key as keyof Schedule] !==
        originalSchedule[key as keyof Schedule]
      )
        return true;
    }
    return false;
  })();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSchedule((prev) => prev && { ...prev, [name]: checked });
  };

  const handleSave = () => {
    if (!dirty || !schedule) return;
    api.schedule
      .update(scheduleId, schedule)
      .then((res) => {
        setSchedule(res);
        setOriginalSchedule(res);
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    api.schedule
      .detail(scheduleId)
      .then((schedule) => {
        setSchedule(schedule);
        setOriginalSchedule(schedule);
        api.reptile
          .detail(schedule.reptile)
          .then((reptile) => setReptileName(reptile.name));
      })
      .catch(() => setSchedule(null));
  }, [scheduleId]);

  if (schedule === undefined) return <Spinner />;

  if (schedule === null) {
    return <ErrorMessage message="Error fetching Schedule" />;
  }

  return (
    <Container maxWidth="md">
      <HeaderTitle
        title={`Schedule${reptileName ? ` for ${reptileName}` : ""} `}
      />

      <Stack sx={{ py: 2 }} spacing={4}>
        <TextField
          value={camelToTitleCase(schedule.type)}
          label="Type"
          sx={{ maxWidth: "12rem", alignSelf: "start" }}
          disabled
        />

        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Description"
          value={schedule.description}
          onChange={(e) =>
            setSchedule(
              (prev) => prev && { ...prev, description: e.target.value }
            )
          }
        />

        <Stack direction="row" flexWrap={"wrap"}>
          {daysList.map((day) => {
            return (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    name={day}
                    checked={!!schedule[day as keyof Schedule]}
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

        <Button
          onClick={handleSave}
          variant="contained"
          sx={{ maxWidth: "12rem", alignSelf: "end" }}
          disabled={!dirty}
          color="primary"
        >
          Save
        </Button>
      </Stack>
    </Container>
  );
};
