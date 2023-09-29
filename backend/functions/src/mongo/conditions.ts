import { Filter } from "mongodb";
import { Condition } from "../lib/auth_types";

export function conditionToFilter<T>(condition: Condition<T>): Filter<T> {
  const filter: Filter<T> = {};
  for (const key in condition) {
    if (condition[key as keyof T]) {
      filter[key as keyof Filter<T>] = {
        $in: condition[key as keyof T],
      };
    }
  }
  return filter;
}
