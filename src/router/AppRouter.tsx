import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import UsersPage from "../pages/UsersPage";

export const router = createBrowserRouter(
    [<Route path="/" element={<LoginPage />}>,
      <Route path="/users" element={<UsersPage />} />
  ]
)
