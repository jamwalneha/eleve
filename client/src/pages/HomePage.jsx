import React, { useEffect } from "react";
import { message, Skeleton, Typography, Row, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, logoutUser } from "../redux/userActions";

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log(token, !token, typeof token);
    if (!token) {
      history.push("/login");
    } else {
      dispatch(getUserDetails());
    }
  }, [dispatch]);

  const {
    isLogoutRequest,
    isLogoutSuccess,
    isLogoutError,
    logoutMessage,

    isGetUserRequest,
    isGetUserSuccess,
    isGetUserError,
    getUserData,
    getUserMessage,
  } = useSelector((store) => ({
    isLogoutRequest: store.user_reducer.isLogoutRequest,
    isLogoutSuccess: store.user_reducer.isLogoutSuccess,
    isLogoutError: store.user_reducer.isLogoutError,
    logoutMessage: store.user_reducer.logoutMessage,

    isGetUserRequest: store.user_reducer.isGetUserRequest,
    isGetUserSuccess: store.user_reducer.isGetUserSuccess,
    isGetUserError: store.user_reducer.isGetUserError,
    getUserData: store.user_reducer.getUserData,
    getUserMessage: store.user_reducer.getUserMessage,
  }));

  useEffect(() => {
    isLogoutError && message.error(logoutMessage);
    isLogoutSuccess && message.success(logoutMessage);
    isLogoutSuccess && history.push("/login");

    isGetUserError && message.error(getUserMessage);
  }, [
    isLogoutError,
    isLogoutSuccess,
    logoutMessage,
    isGetUserError,
    getUserMessage,
  ]);

  const handleLogout = () => {
      dispatch(logoutUser())
  }

  return (
      <>
    {isGetUserRequest && <Skeleton active />}
    {isGetUserSuccess &&<div>
        <Row justify="center">
      <Typography.Title>
        Welcome {getUserData[0].first_name} {getUserData[0].last_name}
      </Typography.Title>
    </Row>
    <Row justify="center">
        <Button type="ghost" onClick={handleLogout}>Logout</Button>
    </Row>
    </div> }
    </>
  );
};

export default HomePage;
