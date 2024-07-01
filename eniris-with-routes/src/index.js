import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Root from "./routes/root"
import Devices, { loader as deviceLoader } from "./routes/devices";
import EditDevices, { loader as editDeviceLoader, action as editAction } from "./routes/edit-devices";
import ErrorBadRoute from "./routes/errors/badPathError";
import ErrorNoData from "./routes/errors/noDataError"

const router = createBrowserRouter([
  {path:"/",
    element:<Root/>,
    errorElement: <ErrorBadRoute/>,
    children:[
      {
        path: "/devices",
        element: <Devices/>,
        loader: deviceLoader,
        errorElement: <ErrorNoData/>,
      },
      {
        path: "/edit-devices",
        element: <EditDevices/>,
        loader: editDeviceLoader,
        action: editAction,
        errorElement: <ErrorNoData/>,
      },
    ]
  }
 
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);