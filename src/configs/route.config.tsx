import React from "react";
import { App403 } from "../components/403";
import { App404 } from "../components/404";
import { ROUTES_URL } from "../constants";
import { ContactManagement } from "../pages/contactManagement";
import { Dashboard } from "../pages/dashboard";
import { EventManagement } from "../pages/eventManagement";
import { Home } from "../pages/home";
import { MyProfile } from "../pages/myProfile";
import { SignIn } from "../pages/signIn";

export const ROUTES = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: ROUTES_URL.DASHBOARD,
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: ROUTES_URL.CONTACT_MANAGEMENT,
    element: <ContactManagement />,
  },
  {
    path: ROUTES_URL.EVENT_MANAGEMENT,
    element: <EventManagement />,
  },
  {
    path: ROUTES_URL.MY_PROFILE,
    element: <MyProfile />,
  },
  {
    path: "/forbidden",
    element: <App403 />,
  },
  {
    path: "*",
    element: <App404 />,
  },
];
