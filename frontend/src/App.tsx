import { RouterProvider } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { authRouter, unAuthRouter } from "./utils/routes";
import { UnAuthContext } from "./context/UnAuthContext";
import { useUserInfo } from "./utils/hooks";
import { Spinner } from "./components/Spinner";

function App() {
  const { user, setUser, logout, api, loadingUser } = useUserInfo();

  if (loadingUser) return <Spinner />;

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
