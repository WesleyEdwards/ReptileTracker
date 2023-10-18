import { useContext } from "react";
import { useReptileContext } from "../reptile/ReptileContext";
import { AuthContext } from "../../context/AuthContext";
import { CreateSchedule } from "./CreateSchedules";
import { HeaderTitle } from "../HeaderTitle";
import { Grid } from "@mui/material";
import ScheduleCard from "./ScheduleCard";
import { Spinner } from "../Spinner";

export const ReptileSchedule = () => {
  const { schedules, loading, reptile } = useReptileContext();
  const { api } = useContext(AuthContext);

  if (loading) return <Spinner />;
  return (
    <>
      <HeaderTitle title="Schedules" secondary>
        <CreateSchedule
          initialReptileId={reptile._id}
          refreshScheduleList={() =>
            api.schedule.query({ reptile: reptile._id }).then(() => {
              console.log("TODO");
            })
          }
        />
      </HeaderTitle>
      <Grid container spacing={4} paddingTop={0}>
        {schedules.map((schedule) => (
          <Grid item key={schedule._id}>
            <ScheduleCard schedule={schedule} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
