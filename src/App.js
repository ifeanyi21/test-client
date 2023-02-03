import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Orders from "./pages/Order/Orders";
import Login from "./pages/Login/Login";
import ViewOrder from "./pages/Order/ViewOrder";
import EditOrder from "./pages/Order/EditOrder";
import Layout from "./Layout/Layout";
import Account from "./pages/Account/Account";
import { LoggedInProvider } from "./services/store/store";

function App() {
  const client = new QueryClient();
  return (
    <div className="App">
      <LoggedInProvider>
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <Routes>
              <Route element={<Login />} path={"/"} />
              <Route
                element={<Layout children={<Orders />} />}
                path={"/order_items"}
              />
              <Route
                element={<Layout children={<ViewOrder />} />}
                path={"/order_items/:id"}
              />
              <Route
                element={<Layout children={<EditOrder />} />}
                path={"/order_items/edit/:id"}
              />
              <Route
                element={<Layout children={<Account />} />}
                path={"/account"}
              />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </LoggedInProvider>
    </div>
  );
}

export default App;
