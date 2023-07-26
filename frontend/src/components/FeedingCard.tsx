import { Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";
import { Feeding } from "../api/models";

interface FeedingRecordProps {
  feeding: Feeding;
}

export const FeedingCard: FC<FeedingRecordProps> = (props) => {
  const { feeding } = props;

  return (
    <Card sx={{ minWidth: "12rem" }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          Food: {feeding.foodItem}
        </Typography>
      </CardContent>
    </Card>
  );
};
