import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import HeaderNav from "../components/HeaderNav";
import CreateAccount from "../pages/CreateAccount";
import { DashboardPage } from "../pages/DashboardPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import { ReptilePage } from "../pages/ReptilePage";
import { SchedulePage } from "../pages/SchedulePage";
import { SchedulesPage } from "../pages/SchedulesPage";
import SignIn from "../pages/SignIn";

type RoutePath =
  | "home"
  | "dashboard"
  | "profile"
  | "reptile/:id"
  | "schedule/:id"
  | "sign-in"
  | "create-account"
  | "schedules";

const pathPageMap: Record<RoutePath, JSX.Element> = {
  home: <HomePage />,
  dashboard: <DashboardPage />,
  profile: <ProfilePage />,
  "reptile/:id": <ReptilePage />,
  "schedule/:id": <SchedulePage />,
  "sign-in": <SignIn />,
  "create-account": <CreateAccount />,
  schedules: <SchedulesPage />,
};

export const unAuthRoutes: RoutePath[] = ["home", "sign-in", "create-account"];
export const authRoutes: RoutePath[] = [
  "dashboard",
  "reptile/:id",
  "schedule/:id",
  "profile",
  "schedules",
];

export const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeaderNav auth={true} />,
    children: [
      ...generateRouteObjects(authRoutes),
      { path: "*", element: <Navigate to="dashboard" replace /> },
    ],
  },
]);

export const unAuthRouter = createBrowserRouter([
  {
    path: "/",
    element: <HeaderNav />,
    children: [
      ...generateRouteObjects(unAuthRoutes),
      { path: "*", element: <Navigate to="home" replace /> },
    ],
  },
]);

function generateRouteObjects(routes: RoutePath[]): RouteObject[] {
  return routes.map((route) => {
    return {
      path: route,
      element: pathPageMap[route],
    };
  });
}
