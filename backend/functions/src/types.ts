export type SexType = "male" | "female";

export type SpeciesType =
  | "ball_python"
  | "king_snake"
  | "corn_snake"
  | "redtail_boa";

export type ScheduleType = "feed" | "record" | "clean";

type DateTime = string;

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type Reptile = {
  _id: string;
  userId: string;
  species: SpeciesType;
  name: string;
  sex: string;
  feeding: Feeding[];
  husbandryRecord: HusbandryRecord[];
  schedule: Schedule[];
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type Feeding = {
  _id: string;
  reptile: Reptile;
  reptileId: string;
  foodItem: string;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type HusbandryRecord = {
  _id: string;
  reptile: Reptile;
  reptileId: string;
  length: number;
  weight: number;
  temperature: number;
  humidity: number;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type Schedule = {
  _id: string;
  reptileId: string;
  userId: string;
  type: ScheduleType;
  description: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  createdAt?: DateTime;
  updatedAt?: DateTime;
};
