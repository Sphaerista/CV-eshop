import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./components/Nav/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import MyOrders from "./pages/MyOrders";
import MyProfile from "./pages/MyProfile";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import SelectedItem from "./components/StoreSection/SelectedItem";
import CartProvider from "./lib/CardProvider";
import { useContext } from "react";
import AuthContext from "./hooks/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <CartProvider>
      <Layout>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          {isLoggedIn && (
            <Route path="/my_orders">
              <MyOrders />
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/my_profile">
              <MyProfile />
            </Route>
          )}
          <Route path="/store" exact>
            <Store />
          </Route>
          {isLoggedIn && (
            <Route path="/cart">
              <Cart />
            </Route>
          )}
          <Route path="/items/:idItem">
            <SelectedItem />
          </Route>
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Layout>
    </CartProvider>
  );
}

export default App;
