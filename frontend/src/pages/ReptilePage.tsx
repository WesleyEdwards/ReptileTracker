import AddIcon from "@mui/icons-material/Add";
import UndoIcon from "@mui/icons-material/Undo";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import {
  Container,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Feeding, HusbandryRecord, Reptile, Schedule } from "../api/models";
import { ErrorMessage } from "../components/ErrorMessage";
import { HeaderTitle } from "../components/HeaderTitle";
import { Spinner } from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";
import { DeleteReptile } from "../components/reptile/DeleteReptile";
import {
  AddInfoType,
  ReptileContext,
} from "../components/reptile/ReptileContext";
import ReptileFeeding from "../components/feeding/ReptileFeeding";
import { ReptileSchedule } from "../components/schedule/ReptileSchedule";
import { ReptileHusbandry } from "../components/husbandry/ReptileHusbandry";

export const ReptilePage: FC = () => {
  const navigate = useNavigate();
  const { id: reptileId } = useParams();
  const { api } = useContext(AuthContext);
  if (!reptileId) return <ErrorMessage title="Error fetching reptile" />;

  const [reptile, setReptile] = useState<Reptile>();
  const [editedReptile, setEditedReptile] = useState<Reptile>();
  const [editingName, setEditingName] = useState(false);
  const [error, setError] = useState<string>("");

  const [reptileInfo, setReptileInfo] = useState<{
    schedules: Schedule[];
    husbandry: HusbandryRecord[];
    feedings: Feeding[];
  }>({
    schedules: [],
    husbandry: [],
    feedings: [],
  });

  function editReptile<T extends keyof Reptile>(field: T, value: Reptile[T]) {
    if (!reptile) return;
    setEditedReptile({ ...reptile, [field as keyof Reptile]: value });
  }

  const save = () => {
    if (!editedReptile) return;
    const { name, sex, species } = editedReptile;
    api.reptile.update(reptileId, { name, sex, species }).then(() => {
      setReptile(editedReptile);
      setEditingName(false);
    });
  };

  const deleteReptile = () => {
    if (!reptile) return;
    api.reptile.delete(reptile._id).then(() => {
      navigate("/dashboard");
    });
  };

  useEffect(() => {
    setReptile(undefined);
    api.reptile
      .detail(reptileId)
      .then((rep) => {
        setReptile(rep);
        setEditedReptile(rep);
      })
      .catch(() => setError("Error loading reptile"));

    Promise.all([
      api.feeding.query({ reptile: reptileId }),
      api.husbandry.query({ reptile: reptileId }),
      api.schedule.query({ reptile: reptileId }),
    ])
      .then(([feedings, husbandry, schedules]) =>
        setReptileInfo({
          feedings,
          husbandry,
          schedules,
        })
      )
      .catch((e) => {
        setError("Error loading reptile info");
      });
  }, [reptileId]);

  const addInfo: AddInfoType = (info, value) => {
    setReptileInfo((prev) => ({ ...prev, [info]: [...prev[info], value] }));
  };

  if (!reptile) return <Spinner />;

  return (
    <ReptileContext.Provider
      value={{
        loading: !reptile,
        reptile,
        addInfo,
        ...reptileInfo,
      }}
    >
      <Container maxWidth="md">
        {editingName ? (
          <>
            <HeaderTitle
              displayComponent={
                <Stack direction="row" alignItems="center" gap={2} width="100%">
                  <TextField
                    fullWidth
                    label="Name"
                    value={editedReptile?.name}
                    onChange={(e) => editReptile("name", e.target.value)}
                  />
                  <div>
                    <Tooltip title="Save">
                      <IconButton onClick={save}>
                        <CheckIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title="Undo">
                      <IconButton onClick={() => setEditingName(false)}>
                        <UndoIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </Stack>
              }
            />
          </>
        ) : (
          <>
            <HeaderTitle title={reptile.name}>
              <IconButton onClick={() => setEditingName(true)}>
                <EditIcon />
              </IconButton>
            </HeaderTitle>
          </>
        )}

        <ReptileFeeding />
        <ReptileHusbandry />
        <ReptileSchedule />

        <DeleteReptile handleDelete={deleteReptile} />
      </Container>
    </ReptileContext.Provider>
  );
};
