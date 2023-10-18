import { List, ListItem } from "@mui/material";
import { HeaderTitle } from "../HeaderTitle";
import { CreateHusbandryRecord } from "./CreateHusbandryRecord";
import { useReptileContext } from "../reptile/ReptileContext";
import { Spinner } from "../Spinner";

export const ReptileHusbandry = () => {
  const { husbandry, loading } = useReptileContext();

  if (loading) return <Spinner />;

  return (
    <>
      <HeaderTitle title="Husbandry Records" secondary>
        <CreateHusbandryRecord />
      </HeaderTitle>
      <List>
        {husbandry.map((record) => (
          <ListItem>{record.humidity}</ListItem>
        ))}
      </List>
    </>
  );
};
