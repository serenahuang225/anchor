import { useLocation, useRoutes } from "react-router-dom";

import { AuthContextComponent } from "./context/AuthContext";
import { UserContextComponent } from "./context/UserContext";

import WrapNav from "./components/nav/WrapNav";
import Dashboard from "./routes/Dashboard";
import Protected from "./routes/Protected"
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import ForgotPass from "./routes/ForgotPass";
import BalanceSheet from "./routes/BalanceSheet";
import BudgetSheet from "./routes/BudgetSheet";
import { AnimatePresence } from "framer-motion";
import { cloneElement } from "react";
import Profile from "./routes/Profile";
import BudgetCategories from "./routes/BudgetCategories";
import Home from "./routes/Home";

function App() {
  const element = useRoutes([
    {
      path:"/",
      element: <Home />
    },
    {
      path:"/home",
      element: <Home />
    },
    {
      path:"/dashboard",
      element: <Protected><WrapNav component={<Dashboard />} /></Protected>
    },
    {
      path:"/transactions",
      element: <Protected><WrapNav isBack={true} component={<BalanceSheet />} /></Protected>
    },
    {
      path:"/budget",
      element: <Protected><WrapNav isBack={true} component={<BudgetSheet />} /></Protected>
    },
    {
      path:"/budget-categories",
      element: <Protected><WrapNav isBack={true} component={<BudgetCategories />} /></Protected>
    },
    {
      path:"/profile",
      element: <Protected><Profile /></Protected>
    },
    {
      path:"/login",
      element: <Login />
    },
    {
      path:"/forgot-password",
      element: <ForgotPass />
    },
    {
      path:"/signup",
      element: <Signup />
    },
  ])

  const location = useLocation();

  return (
    <AuthContextComponent>
      <UserContextComponent>
        <AnimatePresence mode='wait'>
          {cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
      </UserContextComponent>
    </AuthContextComponent>
  );
}

export default App;
