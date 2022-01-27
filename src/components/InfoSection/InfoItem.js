import styles from "./InfoItem.module.css";

import UpdateInfoForm from "./UpdateInfoForm";
import { useState } from "react";
const InfoItem = (props) => {
  const [editHandler, setEditHandler] = useState(false);
  const showEditHandler = () => {
    setEditHandler(() => !editHandler);
  };

  const transferUpdatePage3 = () => {
    props.transferUpdatePage2();
  };
  return (
    <>
      <ul className={styles.ul}>
        <div className={styles.divided}>
          <div className={styles.item}>
            {props.id}: {props.value}
          </div>
          <div className={styles.editbutton}>
            <button onClick={showEditHandler}>Edit</button>
          </div>
        </div>
        {editHandler && (
          <UpdateInfoForm
            setEditHandler={setEditHandler}
            ontransferUpdatePage4={transferUpdatePage3}
            whatToUpdate={props.id}
          />
        )}
      </ul>
    </>
  );
};

export default InfoItem;
