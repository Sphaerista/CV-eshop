/* eslint-disable */
import styles from "./AddInfo.module.css";
import { useContext, useState } from "react";
import { useRef } from "react/cjs/react.development";
import AuthContext from "../../hooks/auth-context";

const FIREBASE_DOMAIN = "https://cv-e-shop-default-rtdb.firebaseio.com";

const AddInfo = (props) => {
  const [openAddInfoSection, setOpenAddInfoSection] = useState(false);

  const inputUserNameRef = useRef();
  const inputFirstNameRef = useRef();
  const inputLastNameRef = useRef();
  const inputCityRef = useRef();
  const inputPostalRef = useRef();
  const inputStreetRef = useRef();

  const authCtx = useContext(AuthContext);
  const emailPath = authCtx.email.split("@").join("").split(".").join("");

  const openAddInfoSectionHandler = () => {
    setOpenAddInfoSection(true);
  };
  const closeAddInfoSectionHandler = () => {
    setOpenAddInfoSection(false);
  };

  const updateInfo = async (bodyCustom) => {
    try {
      const response = await fetch(
        `${FIREBASE_DOMAIN}/users/${emailPath}.json`,
        {
          method: "PATCH",
          body: JSON.stringify(bodyCustom),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("sth wrong");
      }
      const data = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };

  const addInfoHandler = (e) => {
    e.preventDefault();
    const enteredUserName = inputUserNameRef.current.value;
    const enteredFirstName = inputFirstNameRef.current.value;
    const enteredLastName = inputLastNameRef.current.value;
    const enteredCity = inputCityRef.current.value;
    const enteredPostal = inputPostalRef.current.value;
    const enteredStreet = inputStreetRef.current.value;

    const bodyEntry = {
      UserName: enteredUserName,
      Forename: enteredFirstName,
      Surename: enteredLastName,
      City: enteredCity,
      Postal: enteredPostal,
      Street: enteredStreet,
    };
    const filteredBodyEntry = Object.entries(bodyEntry).filter(
      ([key, value]) => value.length > 0
    );
    const bodyCustom = Object.fromEntries(filteredBodyEntry);
    updateInfo(bodyCustom);
    setTimeout(() => {
      props.onUpdatedInputHandler();
    }, 750);
  };
  return (
    <>
      {!openAddInfoSection && (
        <div className={styles["div-ok-button"]}>
          <button
            className={styles["ok-button"]}
            onClick={openAddInfoSectionHandler}
          >
            Add info
          </button>
        </div>
      )}
      {openAddInfoSection && (
        <div>
          <div className={styles["div-back-button"]}>
            <button
              className={styles["back-button"]}
              onClick={closeAddInfoSectionHandler}
            >
              ^
            </button>
          </div>

          <div className={styles["chekout-form"]}>
            <form className={styles.form} onSubmit={addInfoHandler}>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" ref={inputUserNameRef} />
              <label htmlFor="forename">Forename</label>
              <input type="text" id="forename" ref={inputFirstNameRef} />
              <label htmlFor="surename">Surename</label>
              <input type="text" id="surename" ref={inputLastNameRef} />
              <label htmlFor="city">City</label>
              <input type="text" id="city" ref={inputCityRef} />
              <label htmlFor="postal">Postal</label>
              <input type="text" id="postal" ref={inputPostalRef} />
              <label htmlFor="street">Street</label>{" "}
              <input type="text" id="street" ref={inputStreetRef} />
              <div className={styles["div-confirm-button"]}>
                <button className={styles["confirm-button"]}>
                  Add data to {emailPath}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddInfo;
