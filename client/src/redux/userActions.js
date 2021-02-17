import axios from "axios";

export const registerUser = (user_body) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_REQUEST" });
    const res = await axios.post("/register-user", { ...user_body });
    if (res.status === 201) {
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
    } else {
      dispatch({ type: "REGISTER_ERROR", payload: res.data.message });
    }
  } catch (error) {
    console.log(error);
    if (error.message) {
      dispatch({ type: "REGISTER_ERROR", payload: error.message });
    } else {
      dispatch({ type: "REGISTER_ERROR", payload: "server error, try again" });
    }
  }
};

export const loginUser = (user_body) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });
    const res = await axios.post("/login-user", { ...user_body });
    if (res.status === 201) {
      localStorage.setItem("access_token", res.data.data[0].access_token);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } else {
      dispatch({ type: "LOGIN_ERROR", payload: res.data.message });
    }
  } catch (error) {
    console.log(error);
    if (error.message) {
      dispatch({ type: "LOGIN_ERROR", payload: error.message });
    } else {
      dispatch({ type: "LOGIN_ERROR", payload: "server error, try again" });
    }
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LOGOUT_REQUEST" });
    const res = await axios.delete("/logout-user", {
      headers: { access_token: localStorage.getItem("access_token") },
    });
    if (res.status === 201) {
      localStorage.removeItem("access_token");
      dispatch({ type: "LOGOUT_SUCCESS", payload: res.data });
    } else {
      dispatch({ type: "LOGOUT_ERROR", payload: res.data.message });
    }
  } catch (error) {
    console.log(error);
    if (error.message) {
      dispatch({ type: "LOGOUT_ERROR", payload: error.message });
    } else {
      dispatch({ type: "LOGOUT_ERROR", payload: "server error, try again" });
    }
  }
};

export const getUserDetails = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_USER_REQUEST" });
    const res = await axios.get("/get-user-details", {
      headers: { access_token: localStorage.getItem("access_token") },
    });
    if (res.status === 201) {
      dispatch({ type: "GET_USER_SUCCESS", payload: res.data });
    } else {
      dispatch({ type: "GET_USER_ERROR", payload: res.data.message });
    }
  } catch (error) {
    console.log(error);
    if (error.message) {
      dispatch({ type: "GET_USER_ERROR", payload: error.message });
    } else {
      dispatch({ type: "GET_USER_ERROR", payload: "server error, try again" });
    }
  }
};
