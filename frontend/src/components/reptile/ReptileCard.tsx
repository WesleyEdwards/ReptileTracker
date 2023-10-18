import { Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Reptile } from "../../api/models";
import { camelToTitleCase } from "../../utils/miscFunctions";

interface ReptileCardProps {
  reptile: Reptile;
}

export const ReptileCard: FC<ReptileCardProps> = ({ reptile }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        minWidth: "12rem",
        cursor: "pointer",
        "&:hover": {
          elevation: 5,
          transform: "scale(1.01)",
        },
      }}
      onClick={() => navigate(`/reptile/${reptile._id}`)}
    >
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {camelToTitleCase(reptile.species)}
        </Typography>
        <Typography variant="h5" component="div">
          {reptile.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {reptile.sex === "male" ? "♂" : "♀"}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReptileCard;
