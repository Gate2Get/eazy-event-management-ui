import React from "react";
import { Route, Routes } from "react-router-dom";
import { APP_ROUTES, SERVICE_ROUTES } from "../configs/route.config";

export const ServiceRoutes = () => {
  return (
    <Routes>
      {SERVICE_ROUTES.map((route) => (
        <Route element={route.element} key={route.path} path={route.path} />
      ))}
    </Routes>
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      {APP_ROUTES.map((route) => (
        <Route element={route.element} key={route.path} path={route.path} />
      ))}
    </Routes>
  );
};