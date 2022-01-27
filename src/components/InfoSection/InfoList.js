import styles from "./InfoList.module.css";
import InfoItem from "./InfoItem";

const InfoList = (props) => {
  const info = props.info;
  const showEditHandler = () => {
    props.onShowEditHandler();
  };

  const transferUpdatePage1 = () => {
    props.onUpdatedInputHandler();
  };

  return (
    <>
      <ul
        className={styles.list}
        key={(Math.random() + 1).toString(36).substring(7)}
      >
        {info.map((info) => {
          return (
            <>
              <InfoItem
                onShowEditHandler={showEditHandler}
                key={info.id + info.value}
                id={info.id}
                value={info.value}
                transferUpdatePage2={transferUpdatePage1}
              />
            </>
          );
        })}
      </ul>
    </>
  );
};

export default InfoList;
