import { Container } from "@mui/material";
import { ScheduleList } from "../components/schedule/ScheduleList";

export const SchedulesPage = () => {
  return (
    <Container maxWidth="md">
      <ScheduleList />
    </Container>
  );
};
