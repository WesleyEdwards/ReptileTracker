import React, { useState, useEffect, useContext } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { Schedule } from "../api/models";
import { ScheduleCard } from "./ScheduleCard";
import { CreateSchedule } from "./CreateSchedules";
import { Spinner } from "./Spinner";
import { ErrorMessage } from "./ErrorMessage";
import { HeaderTitle } from "./HeaderTitle";
import { daysList } from "../utils/constants";
import { camelToTitleCase } from "../utils/miscFunctions";

export const ScheduleList = () => {
  const [schedules, setSchedules] = useState<Schedule[] | null>();
  const [otherSchedules, setOtherSchedules] = useState<Schedule[]>([]);
  const { api, user } = useContext(AuthContext);

  const today = daysList[new Date().getDay()];

  const fetchSchedules = () => {
    setSchedules(undefined);
    api
      .getSchedulesByUser(user.id)
      .then((schedules) => {
        const todaySchedules = schedules.filter(
          (schedule) => schedule[today as keyof Schedule]
        );
        setSchedules(todaySchedules);
        const otherSchedules = schedules.filter(
          (schedule) => !schedule[today as keyof Schedule]
        );
        setOtherSchedules(otherSchedules);
      })
      .catch(() => setSchedules(null));
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  if (schedules === undefined) return <Spinner />;
  if (schedules === null)
    return <ErrorMessage title="Error fetching reptiles" />;
  if (schedules.length === 0) {
    return (
      <Typography>
        You have no schedule for {camelToTitleCase(today)}
      </Typography>
    );
  }
  return (
    <>
      <HeaderTitle title="My Schedules">
        <CreateSchedule refreshScheduleList={fetchSchedules} />
      </HeaderTitle>
      <HeaderTitle title="Today's Schedules" secondary />

      <Grid container spacing={4} paddingTop={4}>
        {schedules.map((schedule) => (
          <Grid item key={schedule.id}>
            <ScheduleCard schedule={schedule} />
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ mt: "2rem" }} />

      <HeaderTitle title="Other Schedules" secondary />

      <Grid container spacing={4} paddingTop={4}>
        {otherSchedules.map((schedule) => (
          <Grid item key={schedule.id}>
            <ScheduleCard schedule={schedule} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
