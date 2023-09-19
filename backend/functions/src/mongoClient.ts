import { Collection, MongoClient } from "mongodb";
import { Feeding, HusbandryRecord, Reptile, Schedule, User } from "./types";
import { DbClient, Endpoints } from "./middleware/auth_types";
import { v4 as uuidv4 } from "uuid";

export const mongoClient = (): DbClient => {
  const mClient: MongoClient = new MongoClient(process.env.MONGO_URI!);
  const db = mClient.db("reptile-tracker-test");
  const userCollection: Collection<User> = db.collection("user");

  return {
    user: {
      createOne: async (user) => {
        console.log(uuidv4());
        const newUser = { ...user, _id: uuidv4() };
        console.log("Inserting", newUser);
        const { acknowledged } = await userCollection.insertOne(newUser);
        console.log(acknowledged);
        if (acknowledged) {
          return newUser;
        }
        return undefined;
      },
      findOne: async (filter) => {
        const user = await userCollection.findOne(filter);
        if (!user) {
          return undefined;
        }
        return user;
      },
      findMany: async (ids: string[]) => {
        const users = await userCollection.find({ _id: { $in: ids } });
        return users.toArray();
      },
      updateOne: async (user: User) => {
        const value = await userCollection.findOneAndUpdate(
          { _id: user._id },
          { $set: user }
        );
        if (!value) {
          throw new Error("User not found");
        }
        return value;
      },
      deleteOne: async (id: string) => {
        const value = await userCollection.findOneAndDelete({ _id: id });
        if (!value) {
          throw new Error("User not found");
        }
        return value;
      },
    },
    reptile: {} as any as Endpoints<Reptile>,
    husbandryRecord: {} as any as Endpoints<HusbandryRecord>,
    feeding: {} as any as Endpoints<Feeding>,
    schedule: {} as any as Endpoints<Schedule>,
  };
};
