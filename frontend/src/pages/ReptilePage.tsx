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
  Grid,
} from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Feeding, HusbandryRecord, Reptile, Schedule } from "../api/models";
import { ErrorMessage } from "../components/ErrorMessage";
import { HeaderTitle } from "../components/HeaderTitle";
import { Spinner } from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";
import { CreateSchedule } from "../components/schedule/CreateSchedules";
import { DeleteReptile } from "../components/reptile/DeleteReptile";
import { CreateHusbandryRecord } from "../components/husbandry/CreateHusbandryRecord";
import { CreateFeeding } from "../components/feeding/CreateFeeding";
import { ScheduleCard } from "../components/schedule/ScheduleCard";
import { HusbandryRecordCard } from "../components/husbandry/HusbandryRecordCard";
import { FeedingCard } from "../components/feeding/FeedingCard";

export const ReptilePage: FC = () => {
  const navigate = useNavigate();
  const { id: reptileId } = useParams();
  const { api } = useContext(AuthContext);
  if (!reptileId) return <ErrorMessage title="Error fetching reptile" />;

  const [reptile, setReptile] = useState<Reptile | null>();
  const [records, setRecords] = useState<HusbandryRecord[]>([]);
  const [feedings, setFeedings] = useState<Feeding[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [editedReptile, setEditedReptile] = useState<Reptile>();
  const [editingName, setEditingName] = useState(false);

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
    Promise.all([
      api.reptile.detail(reptileId).then((rep) => {
        setReptile(rep);
        setEditedReptile(rep);
      }),
      api.feeding.query({ reptile: reptileId }).then(setFeedings),
      api.husbandry.query({ reptile: reptileId }).then(setRecords),
      api.schedule.query({ reptile: reptileId }).then(setSchedules),
    ]).catch((e) => {
      setReptile(null);
    });
  }, [reptileId]);

  if (reptile === undefined) return <Spinner />;
  if (reptile === null) return <ErrorMessage title="Error fetching reptile" />;

  return (
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
      <HeaderTitle title="Feedings" secondary>
        <CreateFeeding
          reptileId={reptile._id}
          refreshFeedingList={() =>
            api.feeding.query({ reptile: reptileId }).then(setFeedings)
          }
        />
      </HeaderTitle>
      <Grid container spacing={4} paddingTop={0}>
        {feedings.map((feeding) => (
          <Grid item key={feeding._id}>
            <FeedingCard feeding={feeding} />
          </Grid>
        ))}
      </Grid>

      <HeaderTitle title="Husbandry Records" secondary>
        <CreateHusbandryRecord
          reptileId={reptile._id}
          refreshHusbandryRecordList={() =>
            api.husbandry.query({ reptile: reptileId }).then(setRecords)
          }
        />
      </HeaderTitle>
      <Grid container spacing={4} paddingTop={0}>
        {records.map((record) => (
          <Grid item key={record._id}>
            <HusbandryRecordCard record={record} />
          </Grid>
        ))}
      </Grid>
      <HeaderTitle title="Schedules" secondary>
        <CreateSchedule
          initialReptileId={reptile._id}
          refreshScheduleList={() =>
            api.schedule.query({ reptile: reptileId }).then(setSchedules)
          }
        />
      </HeaderTitle>
      <Grid container spacing={4} paddingTop={0}>
        {schedules.map((schedule) => (
          <Grid item key={schedule._id}>
            <ScheduleCard schedule={schedule} />
          </Grid>
        ))}
      </Grid>
      <DeleteReptile handleDelete={deleteReptile} />
    </Container>
  );
};
