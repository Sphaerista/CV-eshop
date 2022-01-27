import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../hooks/auth-context";
import useHttp from "../hooks/use-http";
import { getPersonalInfo } from "../lib/api";
import LoadingSpinner from "./../UI/LoadingSpinner";

const Home = () => {
  const { sendRequest, data, status, error } = useHttp(getPersonalInfo, true);
  const authCtx = useContext(AuthContext);
  const emailPath = authCtx.email?.split("@").join("").split(".").join("");
  const isLoggedIn = authCtx.isLoggedIn;

  useEffect(() => {
    if (emailPath) {
      sendRequest(emailPath);
    }
    if (!emailPath) {
      sendRequest(null);
    }
    // return () => sendRequest();
  }, [sendRequest, emailPath]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <div className="centered focused">{error}</div>;
  }

  if ((status === "completed" && !data) || data.length === 0) {
    return (
      <>
        {" "}
        <div className="centered focused">Hello Stranger</div>
        {!isLoggedIn && (
          <div className="description">
            <h3>
              This project is a simple simulation of e-shop. The main scope was
              to imitate e-shop's functionality without giving importance to
              visual design, aesthetic appeal and responsiveness.
            </h3>
            <div>
              <h4>These are the features that I was focused on:</h4>
              <ul>
                <li>Logging in / Signing in.</li>
                <li>Adding items to the cart.</li>
                <li>Changing quantity in the cart.</li>
                <li>Making an order.</li>
                <li>Checking the info of submitted order.</li>
                <li>Canceling the submitted order.</li>
                <li>Viewing and changing personal info.</li>
                <li>
                  Showing different information and features depending on the
                  data provided by the user.
                </li>
              </ul>
            </div>{" "}
          </div>
        )}
        {isLoggedIn && (
          <>
            <div className="description">
              You can add or edit your personal information (such as username)
              on{" "}
              <span className="go-to-profile">
                <NavLink to="/my_profile">'My Profile'</NavLink>
              </span>{" "}
              section.
            </div>
          </>
        )}
      </>
    );
  }

  if (status === "completed" && data) {
    const filteredData = Object.entries(data).filter(
      ([key, value]) => value.id === "UserName"
    );

    if (filteredData < 1) {
      return <div className="centered focused">Hello User</div>;
    } else {
      const getUserName = filteredData[0][1].value;
      return <div className="centered focused">Hello {getUserName}</div>;
    }
  }

  return <></>;
};

export default Home;
