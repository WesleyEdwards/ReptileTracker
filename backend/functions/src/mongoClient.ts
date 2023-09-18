import { Collection, InsertOneResult, MongoClient } from "mongodb";
import { User } from "./types";

// export const mongoClient = (mClient: MongoClient) => {
//   () => {
//     mClient.connect().then((client) => {
//       const db = client.db("reptile-tracker-test");
//       db.collection("reptile-test").insertOne({
//         name: "test",
//       });
//       return res.send("Hello from Firebase!");
//     });
//   };
// };

type HasId = {
  _id: string;
};

type OrError<T> = T | undefined;

type Endpoints<T extends HasId> = {
  createOne: (user: T) => Promise<OrError<T>>;
  findOne: (id: string) => Promise<OrError<T>>;
  findMany: (id: string[]) => Promise<OrError<T[]>>;
  updateOne: (user: T) => Promise<OrError<T>>;
  deleteOne: (id: string) => Promise<OrError<T>>;
};

type DbClient = {
  user: Endpoints<User>;
};

export const mongoClient = (): DbClient => {
  const mClient: MongoClient = new MongoClient(process.env.MONGO_URI!);
  const db = mClient.db("reptile-tracker-test");
  const userCollection: Collection<User> = db.collection("user");

  return {
    user: {
      createOne: async (user: User) => {
        const { acknowledged } = await userCollection.insertOne(user);
        if (acknowledged) {
          return user;
        }
        return undefined;
      },
      findOne: async (id: string) => {
        const user = await userCollection.findOne({ _id: id });
        if (!user) {
          throw new Error("User not found");
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
  };
};
