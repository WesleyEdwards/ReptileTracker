import { HusbandryRecord, Schedule } from "../api/models";

export const daysList = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const initialSchedule = {
  type: "feed",
  description: "",
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
} satisfies Partial<Schedule>;

export const initialHusbandryRecord = {
  length: undefined,
  weight: undefined,
  temperature: undefined,
  humidity: undefined,
} satisfies Partial<HusbandryRecord>;

// export const initialFeedingRecord: CreateFeedingBody = {
//   foodItem: "",
// };
