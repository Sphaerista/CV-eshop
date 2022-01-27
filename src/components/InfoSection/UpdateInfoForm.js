/* eslint-disable */
import styles from "./UpdateInfoForm.module.css";
import { useContext, useState } from "react";
import AuthContext from "../../hooks/auth-context";

const FIREBASE_DOMAIN = "https://cv-e-shop-default-rtdb.firebaseio.com";

const UpdateInfoForm = (props) => {
  const [inputText, setInputText] = useState("");
  const authCtx = useContext(AuthContext);
  const emailPath = authCtx.email.split("@").join("").split(".").join("");

  const updateInfo = async (inputText) => {
    let bodyCustom = {};
    bodyCustom[props.whatToUpdate] = inputText;

    console.log(bodyCustom);

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

  const inputHandler = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
  };
  const updateInfoHandler = (e) => {
    e.preventDefault();
    console.log(inputText);
    updateInfo(inputText, props.whatToUpdate);
    setTimeout(() => {
      props.ontransferUpdatePage4();
    }, 750);

    setInputText("");
    props.setEditHandler(false);
  };
  return (
    <div className={styles.update}>
      <form onSubmit={updateInfoHandler}>
        <div className={styles.divided}>
          <input
            type="text"
            id="input"
            onChange={inputHandler}
            value={inputText}
            required
            placeholder={props.whatToUpdate}
          />
          <div className={styles.updatebutton}>
            <button>Update</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateInfoForm;
