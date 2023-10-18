import { List, ListItem } from "@mui/material";
import { FC } from "react";
import { HeaderTitle } from "../HeaderTitle";
import { CreateFeeding } from "./CreateFeeding";
import { useReptileContext } from "../reptile/ReptileContext";
import { Spinner } from "../Spinner";

export const ReptileFeeding: FC = () => {
  const { feedings, loading } = useReptileContext();
  if (loading) return <Spinner />;

  return (
    <>
      <HeaderTitle title="Feedings" secondary>
        <CreateFeeding />
      </HeaderTitle>
      <List>
        {feedings.map((feeding) => (
          <ListItem>{feeding.foodItem}</ListItem>
        ))}
      </List>
    </>
  );
};

export default ReptileFeeding;
