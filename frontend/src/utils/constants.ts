import {
  CreateFeedingBody,
  CreateHusbandryBody,
  CreateScheduleBody,
} from "../api/apiTypes";

export const daysList = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const initialSchedule: CreateScheduleBody = {
  type: "feed",
  description: "",
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

export const initialHusbandryRecord = {
  length: undefined,
  weight: undefined,
  temperature: undefined,
  humidity: undefined,
} as Record<string, number | undefined>;

export const initialFeedingRecord: CreateFeedingBody = {
  foodItem: "",
};
