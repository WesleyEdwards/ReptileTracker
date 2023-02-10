export type SexType = "male" | "female";

export type SpeciesType =
  | "ball_python"
  | "king_snake"
  | "corn_snake"
  | "redtail_boa";

export type ScheduleType = "feed" | "record" | "clean";

export type CreateUserBody = {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
};

export type CreateReptileBody = {
  userId: number;
  species: SpeciesType;
  name: string;
  sex: SexType;
};

export type UpdateReptileBody = {
  species?: SpeciesType;
  name?: string;
  sex?: string;
};

export type CreateScheduleBody = {
  reptileId: number;
  userId: number;
  type: ScheduleType;
  description: string;
};

export const emptyScheduleDays = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};
