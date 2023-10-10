import { getToken, setTokenToLocalStorage } from "../utils/miscFunctions";
import { Condition, LoginBody } from "./apiTypes";
import { Reptile, User, Schedule, HusbandryRecord, Feeding } from "./models";

type Method = "get" | "post" | "put" | "delete";

export class Api {
  private token: string;
  public baseUrl = import.meta.env.VITE_BACKEND_URL;

  public constructor(token: string | null) {
    this.token = token || "";
  }

  public getToken() {
    return this.token;
  }

  private setToken(token: string) {
    if (!token) return;
    this.token = token;
    setTokenToLocalStorage(token);
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
    if (result.status !== 200) return Promise.reject(result.json());
    return result.json();
  }

  private get(path: string) {
    return this.makeRequest(path, "get");
  }

  private post(path: string, body: Record<string, any>) {
    return this.makeRequest(path, "post", body);
  }

  private put(path: string, body: Record<string, any>) {
    return this.makeRequest(path, "put", body);
  }

  private del(path: string) {
    return this.makeRequest(path, "delete");
  }

  readonly auth = {
    createAccount: (body: User & { password: string }): Promise<User> => {
      return this.post("user/create", body).then((res) => {
        this.setToken(res.token);
        return res.user;
      });
    },
    signIn: (body: LoginBody): Promise<User> => {
      return this.post("user/login", body).then((res) => {
        this.setToken(res.token);
        return res.user;
      });
    },
    getSelf: (): Promise<User> => {
      if (!this.token) return Promise.reject(null);
      return this.get("user");
    },
    refreshToken: (): Promise<string> => {
      if (!this.token) return Promise.reject(null);
      return this.post("user/refresh", {}).then((jwt) => {
        this.setToken(jwt);
        return jwt;
      });
    },
  };

  readonly user = {
    detail: (id: string): Promise<User> => {
      return this.get(`user/${id}`);
    },
    query: (filter: Condition<User>): Promise<User[]> => {
      return this.post("user", filter);
    },
    create: (body: User): Promise<User> => {
      return this.post("user/create", body);
    },
    update: (id: string, rep: Partial<User>): Promise<User> => {
      return this.put(`user/${id}`, rep);
    },
    delete: (id: string): Promise<User> => {
      return this.del(`user/${id}`);
    },
  };

  readonly reptile = {
    detail: (id: string): Promise<Reptile> => {
      return this.get(`reptile/${id}`);
    },
    query: (filter: Condition<Reptile>): Promise<Reptile[]> => {
      return this.post("reptile", filter);
    },
    create: (body: Reptile): Promise<Reptile> => {
      return this.post("reptile/create", body);
    },
    update: (id: string, body: Partial<Reptile>): Promise<Reptile> => {
      return this.put(`reptile/${id}`, body);
    },
    delete: (id: string): Promise<Reptile> => {
      return this.del(`reptile/${id}`);
    },
  };
  readonly feeding = {
    detail: (id: string): Promise<Feeding> => {
      return this.get(`feeding/${id}`);
    },
    query: (filter: Condition<Feeding>): Promise<Feeding[]> => {
      return this.post("feeding", filter);
    },
    create: (body: Feeding): Promise<Feeding> => {
      return this.post("feeding/create", body);
    },
    update: (id: string, body: Partial<Feeding>): Promise<Feeding> => {
      return this.put(`feeding/${id}`, body);
    },
    delete: (id: string): Promise<Feeding> => {
      return this.del(`feeding/${id}`);
    },
  };
  readonly schedule = {
    detail: (id: string): Promise<Schedule> => {
      return this.get(`schedule/${id}`);
    },
    query: (filter: Condition<Schedule>): Promise<Schedule[]> => {
      return this.post("schedule", filter);
    },
    create: (body: Schedule): Promise<Schedule> => {
      return this.post("schedule/create", body);
    },
    update: (id: string, body: Partial<Schedule>): Promise<Schedule> => {
      return this.put(`schedule/${id}`, body);
    },
    delete: (id: string): Promise<Schedule> => {
      return this.del(`schedule/${id}`);
    },
  };
  readonly husbandry = {
    detail: (id: string): Promise<HusbandryRecord> => {
      return this.get(`husbandry/${id}`);
    },
    query: (filter: Condition<HusbandryRecord>): Promise<HusbandryRecord[]> => {
      return this.post("husbandry", filter);
    },
    create: (body: HusbandryRecord): Promise<HusbandryRecord> => {
      return this.post("husbandry/create", body);
    },
    update: (
      id: string,
      body: Partial<HusbandryRecord>
    ): Promise<HusbandryRecord> => {
      return this.put(`husbandry/${id}`, body);
    },
    delete: (id: string): Promise<HusbandryRecord> => {
      return this.del(`husbandry/${id}`);
    },
  };
}
