import { RouterProvider } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { authRouter, unAuthRouter } from "./utils/routes";
import { UnAuthContext } from "./context/UnAuthContext";
import { useUserInfo } from "./utils/hooks";

function App() {
  const { user, setUser, logout, api } = useUserInfo();

  return (
    <>
      {user ? (
        <AuthContext.Provider value={{ user, setUser, logout, api }}>
          <RouterProvider router={authRouter} />
        </AuthContext.Provider>
      ) : (
        <UnAuthContext.Provider value={{ setUser, api }}>
          <RouterProvider router={unAuthRouter} />
        </UnAuthContext.Provider>
      )}
    </>
  );
}

export default App;
