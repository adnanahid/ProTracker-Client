import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import ErrorPage from "./Pages/ErrorPage";
import LoginPage from "./Pages/LoginPage";
import Home from "./Pages/HomePage/Home";
import JoinAsEmployee from "./Pages/JoinAsEmployee";
import AuthProvider from "./Provider/AuthProvider";
import JoinAsHR from "./Pages/JoinAsHR";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/join-as-employee",
        element: <JoinAsEmployee></JoinAsEmployee>,
      },
      {
        path: "/join-as-hr",
        element: <JoinAsHR></JoinAsHR>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
