import { createContext, useContext } from "react";
import { Feeding, HusbandryRecord, Schedule, Reptile } from "../../api/models";

type ReptileInfo = "feedings" | "husbandry" | "schedules";

type AddInfo<T extends ReptileInfo> = T extends "feedings"
  ? Feeding
  : T extends "husbandry"
  ? HusbandryRecord
  : T extends "schedules"
  ? Schedule
  : never;

export type AddInfoType = <T extends ReptileInfo>(info: T, value: AddInfo<T>) => void;

export const ReptileContext = createContext({
  loading: false,
  reptile: {} as Reptile,
  feedings: [] as Feeding[],
  husbandry: [] as HusbandryRecord[],
  schedules: [] as Schedule[],
  addInfo: {} as AddInfoType,
});

export const useReptileContext = () => {
  return useContext(ReptileContext);
};
