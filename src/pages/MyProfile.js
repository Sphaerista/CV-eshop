import { useContext, useEffect, useState } from "react";
import AuthContext from "../hooks/auth-context";
import useHttp from "../hooks/use-http";
import { getPersonalInfo } from "../lib/api";
import LoadingSpinner from "./../UI/LoadingSpinner";
import InfoList from "./../components/InfoSection/InfoList";
import UpdateInfoForm from "./../components/InfoSection/UpdateInfoForm";
import AddInfo from "./../components/InfoSection/AddInfo";

const MyProfile = () => {
  const [updatedInput, setUpdatedInput] = useState(false);
  const [editHandler, setEditHandler] = useState(false);
  const {
    sendRequest,
    status,
    data: loadedInfo,
    error,
  } = useHttp(getPersonalInfo, true);
  const authCtx = useContext(AuthContext);
  const emailPath = authCtx.email.split("@").join("").split(".").join("");

  const updatedInputHandler = () => {
    setUpdatedInput(!updatedInput);
  };
  const showEditHandler = () => {
    setEditHandler(() => !editHandler);
  };

  useEffect(() => {
    sendRequest(emailPath);
    // return () => sendRequest(emailPath);
  }, [sendRequest, emailPath, updatedInput]);

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

  if (status === "completed" && loadedInfo.length < 1) {
    return (
      <>
        <div className="centered focused">There is no Info yet!</div>
        <AddInfo onUpdatedInputHandler={updatedInputHandler} />
      </>
    );
  }

  return (
    <>
      {loadedInfo && (
        <InfoList
          info={loadedInfo}
          onShowEditHandler={showEditHandler}
          onUpdatedInputHandler={updatedInputHandler}
        />
      )}
      {loadedInfo.length < 5 && (
        <AddInfo onUpdatedInputHandler={updatedInputHandler} />
      )}
    </>
  );
};

export default MyProfile;
