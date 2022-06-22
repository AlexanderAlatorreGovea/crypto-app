import React from "react";
import { Routes as ReactRouterRoutes, Route } from "react-router";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";

export const Routes = () => (
  <ReactRouterRoutes>
    <Route path="login" element={<LoginPage />} />
    <Route path="signup" element={<SignupPage />} />
  </ReactRouterRoutes>
);
