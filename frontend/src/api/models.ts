export type SexType = "male" | "female";

export type SpeciesType =
  | "ball_python"
  | "king_snake"
  | "corn_snake"
  | "redtail_boa";

export type ScheduleType = "feed" | "record" | "clean";

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  admin: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Reptile = {
  _id: string;
  user: string;
  species: SpeciesType;
  name: string;
  sex: SexType;
  feeding: string[];
  husbandryRecord: string[];
  schedule: string[];
  createdAt: string;
  updatedAt: string;
};

export type Feeding = {
  _id: string;
  reptile: string;
  foodItem: string;
  createdAt: string;
  updatedAt: string;
};

export type HusbandryRecord = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  reptile: string;
  length?: number | undefined;
  weight?: number | undefined;
  temperature?: number | undefined;
  humidity?: number | undefined;
};

export type Schedule = {
  _id: string;
  type: ScheduleType;
  reptile: string;
  description: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  createdAt: string;
  updatedAt: string;
};
