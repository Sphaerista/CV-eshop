import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
import HeaderCart from "./HeaderCart";
import { useContext } from "react";
import AuthContext from "../../hooks/auth-context";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.left_header}>
          <div className={styles.left_div}>
            <NavLink to="/home" activeClassName={styles.active}>
              Home
            </NavLink>
          </div>
          {!isLoggedIn && (
            <div className={styles.left_div}>
              {" "}
              <NavLink to="/auth" activeClassName={styles.active}>
                Login / Sign up
              </NavLink>
            </div>
          )}
          {isLoggedIn && (
            <div className={styles.left_div}>
              <span onClick={logoutHandler}>Logout</span>
            </div>
          )}
        </div>
        <nav>
          <ul>
            {isLoggedIn && (
              <li>
                {" "}
                <NavLink to="/my_orders" activeClassName={styles.active}>
                  My Orders
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <li>
                {" "}
                <NavLink to="/my_profile" activeClassName={styles.active}>
                  My Profile
                </NavLink>
              </li>
            )}
            <li>
              {" "}
              <NavLink to="/store" activeClassName={styles.active}>
                Store
              </NavLink>
            </li>
            <li>{isLoggedIn && <HeaderCart />}</li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navigation;
