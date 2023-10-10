import { Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Schedule } from "../../api/models";
import { daysList } from "../../utils/constants";
import { camelToTitleCase } from "../../utils/miscFunctions";

interface ScheduleCardProps {
  schedule: Schedule;
}

export const ScheduleCard: FC<ScheduleCardProps> = (
  props: ScheduleCardProps
) => {
  const navigate = useNavigate();
  const { schedule } = props;
  const selectedDays = daysList.filter(
    (day) => schedule[day as keyof Schedule]
  );

  return (
    <Card
      sx={{ minWidth: "12rem", cursor: "pointer" }}
      onClick={() => {
        navigate(`/schedule/${schedule._id}`);
      }}
    >
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {camelToTitleCase(schedule.type)}
        </Typography>
        <Typography color="textSecondary">
          {selectedDays.length > 0
            ? selectedDays.join(", ")
            : "No days selected"}
        </Typography>
        <Typography variant="body2" component="p">
          {schedule.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ScheduleCard;
