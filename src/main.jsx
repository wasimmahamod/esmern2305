import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import firebaseConfig from "./firebase.config.js";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import ForgetPassword from "./pages/ForgetPassword.jsx";
import Home from "./pages/Home.jsx";
import { store } from "./store.js";
import { Provider } from "react-redux";
import Msg from "./pages/Msg.jsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/message",
    element: <Msg />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
