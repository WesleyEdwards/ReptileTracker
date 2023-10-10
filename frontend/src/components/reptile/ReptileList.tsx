import { Button, Grid } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { Reptile } from "../../api/models";
import { AuthContext } from "../../context/AuthContext";
import { CreateReptile } from "./CreateReptile";
import { ErrorMessage } from "../ErrorMessage";
import { HeaderTitle } from "../HeaderTitle";
import ReptileCard from "./ReptileCard";
import { Spinner } from "../Spinner";

export const ReptileList = () => {
  const [reptiles, setReptiles] = useState<Reptile[] | null>();
  const { api, user } = useContext(AuthContext);

  const fetchReptiles = () => {
    setReptiles(undefined);
    api.reptile
      .query({
        user: user._id,
      })
      .then(setReptiles)
      .catch(() => setReptiles(null));
  };

  useEffect(() => {
    fetchReptiles();
  }, []);

  if (reptiles === undefined) return <Spinner />;
  if (reptiles === null)
    return <ErrorMessage title="Error fetching reptiles" />;
  return (
    <>
      <HeaderTitle title="My Reptiles" secondary>
        <CreateReptile refreshReptileList={fetchReptiles} />
      </HeaderTitle>

      <Grid container spacing={4} paddingTop={8}>
        {reptiles.map((reptile) => (
          <Grid item key={reptile._id}>
            <ReptileCard reptile={reptile} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default ReptileList;
