import {
  Collection,
  Db,
  Filter,
  MongoClient,
  OptionalUnlessRequiredId
} from "mongodb"
import {DbClient, BasicEndpoints, Condition, HasId} from "../lib/auth_types"
import {conditionToFilter} from "./conditions"
import {Feeding, HusbandryRecord, Reptile, Schedule, User} from "../types"

export const mongoClient = (): DbClient => {
  const mClient: MongoClient = new MongoClient(process.env.MONGO_URI!)
  const db = mClient.db("reptile-tracker-test")

  return {
    user: functionsForModel<User>(db, "user"),
    reptile: functionsForModel<Reptile>(db, "reptile"),
    husbandryRecord: functionsForModel<HusbandryRecord>(db, "husbandryRecord"),
    feeding: functionsForModel<Feeding>(db, "feeding"),
    schedule: functionsForModel<Schedule>(db, "schedule")
  }
}

function functionsForModel<T extends HasId>(
  db: Db,
  model: string
): BasicEndpoints<T> {
  const collection: Collection<T> = db.collection(model)

  return {
    createOne: async (newItem: T) => {
      const {acknowledged} = await collection.insertOne(
        newItem as OptionalUnlessRequiredId<T>
      )
      if (acknowledged) {
        return newItem
      }
      return undefined
    },
    findOne: async (filter) => {
      const item = (await collection.findOne(
        conditionToFilter(filter)
      )) as T | null
      if (item) {
        return item
      }
      return undefined
    },
    findMany: async (filter: Condition<T>) => {
      const items = collection.find(conditionToFilter(filter))
      return (await items.toArray()) as T[]
    },
    updateOne: async (id, item) => {
      const value = await collection.findOneAndUpdate({_id: id} as Filter<T>, {
        $set: item
      })
      if (!value) {
        throw new Error("Item not found")
      }
      return value as T
    },
    deleteOne: async (id: string) => {
      const item = await collection.findOneAndDelete({_id: id} as Filter<T>)
      if (!item) {
        throw new Error("Item not found")
      }
      return item._id
    }
  }
}
