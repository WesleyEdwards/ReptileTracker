import {Filter} from "mongodb"
import {Condition, HasId} from "../lib/auth_types"

export function conditionToFilter<T extends HasId>(condition: Condition<T>): Filter<T> {
  const filter: Filter<T> = {}
  for (const key in condition) {
    if (condition[key as keyof T]) {
      if (Array.isArray(condition[key as keyof T])) {
        filter[key as keyof Filter<T>] = {
          $in: condition[key as keyof T]
        }
      } else {
        filter[key as keyof Filter<T>] = condition[key as keyof T]
      }
    }
  }
  return filter
}
