import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";

import Dashboard from "./features/auth/Dashboard";
import Missing from "./components/Missing";

import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";

import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";

import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/constant";

import StockList from "./features/stocks/StocksList";
import NewStock from "./features/stocks/NewStock";
import EditStock from "./features/stocks/EditStock";

import RecipesList from "./features/recipes/RecipesList";
import NewRecipe from "./features/recipes/NewRecipe";
import EditRecipe from "./features/recipes/EditRecipe";

import MenusList from "./features/menus/MenusList";
import NewMenu from "./features/menus/NewMenu";
import EditMenu from "./features/menus/EditMenu";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Dashboard />} />

                {/* Stock Routes */}
                <Route path="stocks">
                  <Route index element={<StockList />} />
                  <Route path=":id" element={<EditStock />} />
                  <Route path="new" element={<NewStock />} />
                </Route>

                {/* Recipe Routes */}
                <Route path="recipes">
                  <Route index element={<RecipesList />} />
                  <Route path=":id" element={<EditRecipe />} />
                  <Route path="new" element={<NewRecipe />} />
                </Route>
                
                {/* Menu Routes */}
                <Route path="menus">
                  <Route index element={<MenusList />} />
                  <Route path=":id" element={<EditMenu />} />
                  <Route path="new" element={<NewMenu />} />
                </Route>

                {/* Admin Routes */}
                <Route
                  path="admin"
                  element={
                    <RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]} />
                  }
                >
                  <Route index element={<Welcome />} />
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>
              </Route>
              {/* End Dash */}
            </Route>{" "}
            {/* End Prefetch */}
          </Route>
        </Route>
        {/* End Protected Routes */}

        {/* Display missing page for every route that does not exist */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
