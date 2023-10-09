import { getToken, setTokenToLocalStorage } from "../utils/miscFunctions";
import { Condition, LoginBody } from "./apiTypes";
import { Reptile, User, Schedule, HusbandryRecord, Feeding } from "./models";

type Method = "get" | "post" | "put" | "delete";

export class Api {
  private token = "";
  public baseUrl = import.meta.env.VITE_BACKEND_URL;

  public constructor() {
    const token = getToken();
    if (token) {
      this.token = token;
    }
  }
  public async makeRequest(
    path: string,
    method: Method,
    body: Record<string, any> = {}
  ) {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };

    if (method === "post" || method === "put") {
      options.body = JSON.stringify(body);
    }

    const result = await fetch(`${this.baseUrl}/${path}`, options);
    return result.json();
  }

  public get(path: string) {
    return this.makeRequest(path, "get");
  }

  post(path: string, body: Record<string, any>) {
    return this.makeRequest(path, "post", body);
  }

  put(path: string, body: Record<string, any>) {
    return this.makeRequest(path, "put", body);
  }

  del(path: string) {
    return this.makeRequest(path, "delete");
  }

  setToken(token: string) {
    if (!token) return;
    this.token = token;
    setTokenToLocalStorage(token);
  }

  createAccount(body: User): Promise<User> {
    return this.post("user", body).then((res) => {
      this.setToken(res.token);
      return res.user;
    });
  }

  signIn(body: LoginBody): Promise<User> {
    return this.post("user/login", body).then((res) => {
      this.setToken(res.token);
      return res.user;
    });
  }
  getUser(): Promise<User | null> {
    return this.get("user").then((res) => {
      if (!res?.user) return null;
      this.setToken(res.token);
      return res.user;
    });
  }

  readonly user = {
    getSelf: (): Promise<User> => {
      return this.get(`user`).then((res) => res);
    },
    detail: (id: string): Promise<User> => {
      return this.get(`user/${id}`).then((res) => res);
    },
    query: (filter: Condition<User>): Promise<User[]> => {
      return this.post("user", filter).then((res) => res);
    },
    create: (body: User): Promise<User> => {
      return this.post("user/create", body).then((res) => res);
    },
    update: (id: string, rep: Partial<User>): Promise<User> => {
      return this.put(`user/${id}`, rep).then((res) => res);
    },
    delete: (id: string): Promise<User> => {
      return this.del(`user/${id}`).then((res) => res);
    },
  };

  readonly reptile = {
    detail: (id: string): Promise<Reptile> => {
      return this.get(`reptiles/${id}`).then((res) => res);
    },
    query: (filter: Condition<Reptile>): Promise<Reptile[]> => {
      return this.post("reptiles", filter).then((res) => res);
    },
    create: (body: Reptile): Promise<Reptile> => {
      return this.post("reptiles/create", body).then((res) => res);
    },
    update: (id: string, rep: Partial<Reptile>): Promise<Reptile> => {
      return this.put(`reptiles/${id}`, rep).then((res) => res);
    },
    delete: (id: string): Promise<Reptile> => {
      return this.del(`reptiles/${id}`).then((res) => res);
    },
  };

  // createSchedule(rep: Schedule, reptileId: string): Promise<Schedule> {
  //   return this.post(`schedules/${reptileId}`, rep).then((res) => res);
  // }

  // getSchedule(scheduleId: string): Promise<Schedule> {
  //   return this.get(`schedules/${scheduleId}`).then((res) => res.schedule);
  // }

  // getSchedulesByReptile(reptileId: string): Promise<Schedule[]> {
  //   return this.get(`schedules/reptile/${reptileId}`).then(
  //     (res) => res.schedules
  //   );
  // }

  // getSchedulesByUser(userID: string): Promise<Schedule[]> {
  //   return this.get(`schedules/user/${userID}`).then((res) => res.schedules);
  // }

  // updateSchedule(scheduleId: string, rep: Schedule): Promise<Schedule> {
  //   return this.put(`schedules/${scheduleId}`, rep).then((res) => res.schedule);
  // }

  // createHusbandryRecord(
  //   reptileId: string,
  //   rep: HusbandryRecord
  // ): Promise<HusbandryRecord> {
  //   return this.post(`record/${reptileId}`, rep).then(
  //     (res) => res.husbandryRecord
  //   );
  // }

  // getHusbandryRecords(reptileId: string): Promise<HusbandryRecord[]> {
  //   return this.get(`record/${reptileId}`).then((res) => res.records);
  // }

  // createFeeding(reptileID: string, rep: Feeding): Promise<Feeding> {
  //   return this.post(`feeding/${reptileID}`, rep).then((res) => res.feeding);
  // }

  // getFeedings(reptileID: string): Promise<Feeding[]> {
  //   return this.get(`feeding/${reptileID}`).then((res) => res.feedings);
  // }
}
