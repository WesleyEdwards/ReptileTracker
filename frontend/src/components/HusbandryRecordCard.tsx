import { Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { HusbandryRecord } from "../api/models";

interface HusbandryRecordProps {
  record: HusbandryRecord;
}

export const HusbandryRecordCard: FC<HusbandryRecordProps> = (props) => {
  const { record } = props;

  return (
    <Card sx={{ minWidth: "12rem" }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          Humidity: {record.humidity}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Length: {record.length}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Temperature: {record.temperature}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Weight: {record.weight}
        </Typography>
        <Typography textAlign="end" sx={{ pt: 2 }}>
          {new Date(record.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
};
