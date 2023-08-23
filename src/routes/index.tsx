import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../configs/route.config";

export const AppRoutes = () => {
  return (
    <Routes>
      {ROUTES.map((route) => (
        <Route element={route.element} key={route.path} path={route.path} />
      ))}
    </Routes>
  );
};
