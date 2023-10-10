import { useEffect, useState } from "react";
import { Api } from "../api/api";
import { User } from "../api/models";
import { getToken, removeToken } from "./miscFunctions";

type UserInfo = () => {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  logout: () => void;
  api: Api;
  loadingUser: boolean;
};

export const useUserInfo: UserInfo = () => {
  const [user, setUser] = useState<User>();
  const [api] = useState(new Api(getToken()));
  const [loadingUser, setLoadingUser] = useState(true);

  const logout = () => {
    removeToken();
    setUser(undefined);
  };

  const fetchUser = async () => {
    if (user) return;
    try {
      const fetchUser = await api.auth.getSelf();
      setUser(fetchUser);
    } catch {
      setUser(undefined);
    }
    setLoadingUser(false);
  };

  useEffect(() => {
    if (api.getToken()) {
      fetchUser();
      return;
    }
    setLoadingUser(false);
  }, []);

  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      api.auth.getSelf();
    }, 1000 * 60 );
    return () => clearInterval(interval);
  }, [user]);

  return { user, setUser, logout, api, loadingUser };
};
