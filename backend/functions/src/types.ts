export type SexType = "male" | "female";

export type SpeciesType =
  | "ball_python"
  | "king_snake"
  | "corn_snake"
  | "redtail_boa";

export type ScheduleType = "feed" | "record" | "clean";

type DateTime = string;
type UUID = string;

export type User = {
  _id: UUID;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  createdAt: DateTime;
  updatedAt: DateTime;
  admin: boolean;
};

export type Reptile = {
  _id: UUID;
  user: UUID;
  species: SpeciesType;
  name: string;
  sex: string;
  feeding: UUID[];
  husbandryRecord: UUID[];
  schedule: UUID[];
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type Feeding = {
  _id: UUID;
  reptile: UUID;
  foodItem: string;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type HusbandryRecord = {
  _id: UUID;
  reptile: string;
  length: number;
  weight: number;
  temperature: number;
  humidity: number;
  createdAt: DateTime;
  updatedAt: DateTime;
};

export type Schedule = {
  _id: UUID;
  reptile: string;
  user: string;
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
