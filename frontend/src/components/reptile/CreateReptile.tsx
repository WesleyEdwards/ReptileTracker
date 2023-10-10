import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { camelToTitleCase } from "../../utils/miscFunctions";
import { SexType, SpeciesType } from "../../api/models";

type CreateReptileProps = {
  refreshReptileList: () => void;
};

export const CreateReptile: FC<CreateReptileProps> = (props) => {
  const { api, user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const [species, setSpecies] = useState<SpeciesType | "">("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState<SexType | "">("");

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setError("");
    setName("");
    setSex("");
    setSpecies("");
  };

  const handleCreateReptile = () => {
    if (!name || !species || !sex) {
      return setError("Please fill out all fields");
    }
    api.reptile
      .create({
        _id: crypto.randomUUID(),
        user: user._id,
        feeding: [],
        husbandryRecord: [],
        schedule: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name,
        species,
        sex,
      })
      .then((newRep) => {
        // A list of the reptiles is stored in the jwt, thus the need to refresh.
        api.auth.refreshToken().then(() => {
          handleClose();
          navigate(`/reptile/${newRep._id}`);
        });
      });
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        startIcon={<AddIcon />}
      >
        Add Reptile
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add Reptile</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the following information to add a reptile.
          </DialogContentText>

          <Stack paddingY={4} gap="2rem">
            <TextField
              onChange={(e) => setName(e.target.value)}
              value={name}
              label="Name"
            />
            <Stack direction="row" gap="2rem">
              <FormControl fullWidth>
                <InputLabel>Sex</InputLabel>
                <Select
                  value={sex}
                  label="Sex"
                  onChange={(e) => setSex(e.target.value as SexType)}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Species</InputLabel>
                <Select
                  value={species}
                  label="Species"
                  onChange={(e) => setSpecies(e.target.value as SpeciesType)}
                >
                  <MenuItem value={"ball_python"}>
                    {camelToTitleCase("ball_python")}
                  </MenuItem>
                  <MenuItem value={"king_snake"}>
                    {camelToTitleCase("king_snake")}
                  </MenuItem>
                  <MenuItem value={"corn_snake"}>
                    {camelToTitleCase("corn_snake")}
                  </MenuItem>
                  <MenuItem value={"redtail_boa"}>
                    {camelToTitleCase("redtail_boa")}
                  </MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          {error && <Alert severity="error">{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateReptile}>
            Add Reptile
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
