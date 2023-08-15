import React from "react";
import { App403 } from "../components/403";
import { App404 } from "../components/404";
import { ContactManagement } from "../pages/contactManagement";
import { Home } from "../pages/home";
import { SignIn } from "../pages/signIn";

export const ROUTES = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/contact-management",
    element: <ContactManagement />,
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
