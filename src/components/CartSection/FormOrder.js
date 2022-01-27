import { useState, useRef, useContext } from "react";
import AuthContext from "../../hooks/auth-context";
import styles from "./FormOrder.module.css";

const isEmpty = (value) => value.trim() === "";
const FormOrder = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const [formInputsValidity, setFormInputsValidity] = useState({
    firstName: true,
    lastName: true,
    city: true,
    postal: true,
    street: true,
  });
  const inputFirstNameRef = useRef();
  const inputLastNameRef = useRef();
  const inputCityRef = useRef();
  const inputPostalRef = useRef();
  const inputStreetRef = useRef();

  const confirmHandler = (e) => {
    e.preventDefault();
    const enteredFirstName = inputFirstNameRef.current.value;
    const enteredLastName = inputLastNameRef.current.value;
    const enteredCity = inputCityRef.current.value;
    const enteredPostal = inputPostalRef.current.value;
    const enteredStreet = inputStreetRef.current.value;

    const enteredFirstNameIsValid = !isEmpty(enteredFirstName);
    const enteredLastNameIsValid = !isEmpty(enteredLastName);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = !isEmpty(enteredPostal);
    const enteredStreetIsValid = !isEmpty(enteredStreet);

    setFormInputsValidity({
      firstName: enteredFirstNameIsValid,
      lastName: enteredLastNameIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
      street: enteredStreetIsValid,
    });

    const formIsValid =
      enteredFirstNameIsValid &&
      enteredLastNameIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid &&
      enteredStreetIsValid;

    if (!formIsValid) {
      return;
    }

    props.onDataOrder({
      Forename: enteredFirstName,
      Surename: enteredLastName,
      City: enteredCity,
      Postal: enteredPostal,
      Street: enteredStreet,
    });
  };

  const firstNameControlStyles = `${styles.control} ${
    !formInputsValidity.firstName && styles.invalid
  }`;
  const lastNameControlStyles = `${styles.control} ${
    !formInputsValidity.lastName && styles.invalid
  }`;
  const cityControlStyles = `${styles.control} ${
    !formInputsValidity.city && styles.invalid
  }`;
  const postalControlStyles = `${styles.control} ${
    !formInputsValidity.postal && styles.invalid
  }`;
  const streetControlStyles = `${styles.control} ${
    !formInputsValidity.street && styles.invalid
  }`;

  return (
    <>
      <div className={styles["div-back-button"]}>
        <button className={styles["back-button"]} onClick={props.onBackToOrder}>
          ^
        </button>
      </div>

      <div className={styles["chekout-form"]}>
        <form className={styles.form} onSubmit={confirmHandler}>
          <div className={firstNameControlStyles}>
            <label htmlFor="forename">Forename: </label>
            <input type="text" id="forename" ref={inputFirstNameRef} />
            {!formInputsValidity.firstName && <p>Can not be blank</p>}
          </div>
          <div className={lastNameControlStyles}>
            <label htmlFor="surname">Surename: </label>
            <input type="text" id="surname" ref={inputLastNameRef} />
            {!formInputsValidity.lastName && <p>Can not be blank</p>}
          </div>
          <div className={cityControlStyles}>
            <label htmlFor="city">City: </label>
            <input type="text" id="city" ref={inputCityRef} />
            {!formInputsValidity.city && <p>Can not be blank</p>}
          </div>
          <div className={postalControlStyles}>
            <label htmlFor="postal">Postal: </label>
            <input type="text" id="postal" ref={inputPostalRef} />
            {!formInputsValidity.postal && <p>Can not be blank</p>}
          </div>
          <div className={streetControlStyles}>
            <label htmlFor="street">Street: </label>
            <input type="text" id="street" ref={inputStreetRef} />
            {!formInputsValidity.street && <p>Can not be blank</p>}
          </div>
          <div className={styles["div-confirm-button"]}>
            {isLoggedIn && (
              <button className={styles["confirm-button"]}>
                Make an order
              </button>
            )}
            {!isLoggedIn && <p>Login to confirm order</p>}
          </div>
        </form>
      </div>
    </>
  );
};

export default FormOrder;
