import { Container } from "@mui/material";
import { ScheduleList } from "../components/ScheduleList";

export const SchedulesPage = () => {
  return (
    <Container maxWidth="md">
      <ScheduleList />
    </Container>
  );
};
