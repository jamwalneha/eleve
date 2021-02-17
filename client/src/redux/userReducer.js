const initialState = {
  isRegisterRequest: false,
  isRegisterSuccess: false,
  isRegisterError: false,
  registerData: [],
  registerMessage: "",

  isLoginRequest: false,
  isLoginSuccess: false,
  isLoginError: false,
  loginData: [],
  loginMessage: "",

  isLogoutRequest: false,
  isLogoutSuccess: false,
  isLogoutError: false,
  logoutMessage: "",

  isGetUserRequest: false,
  isGetUserSuccess: false,
  isGetUserError: false,
  getUserData: [],
  getUserMessage: "",
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    // Register User
    case "REGISTER_REQUEST": {
      return {
        ...state,
        isRegisterRequest: true,
        isRegisterSuccess: false,
        isRegisterError: false,
        registerData: [],
        registerMessage: "",
      };
    }
    case "REGISTER_SUCCESS": {
      return {
        ...state,
        isRegisterRequest: false,
        isRegisterSuccess: true,
        registerData: action.payload.data,
        registerMessage: action.payload.message,
      };
    }
    case "REGISTER_ERROR": {
      return {
        ...state,
        isRegisterRequest: false,
        isRegisterError: true,
        registerMessage: action.payload,
      };
    }

    // Login User
    case "LOGIN_REQUEST": {
      return {
        ...state,
        isLoginRequest: true,
        isLoginSuccess: false,
        isLoginError: false,
        loginData: [],
        loginMessage: "",
        isLogoutRequest: false,
        isLogoutSuccess: false,
        isLogoutError: false,
        logoutMessage: "",
      };
    }
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        isLoginRequest: false,
        isLoginSuccess: true,
        loginData: action.payload.data,
        loginMessage: action.payload.message,
      };
    }
    case "LOGIN_ERROR": {
      return {
        ...state,
        isLoginRequest: false,
        isLoginError: true,
        loginMessage: action.payload,
      };
    }

    // Logout User
    case "LOGOUT_REQUEST": {
      return {
        ...state,
        isLogoutRequest: true,
        isLogoutSuccess: false,
        isLogoutError: false,
        logoutMessage: "",
      };
    }
    case "LOGOUT_SUCCESS": {
      return {
        ...state,
        isLogoutRequest: false,
        isLogoutSuccess: true,
        logoutMessage: action.payload.message,
      };
    }
    case "LOGOUT_ERROR": {
      return {
        ...state,
        isLogoutRequest: false,
        isLogoutError: true,
        logoutMessage: action.payload,
      };
    }

    // Get User
    case "GET_USER_REQUEST": {
      return {
        ...state,
        isGetUserRequest: true,
        isGetUserSuccess: false,
        isGetUserError: false,
        getUserData: [],
        getUserMessage: "",
        isRegisterRequest: false,
        isRegisterSuccess: false,
        isRegisterError: false,
        registerData: [],
        registerMessage: "",
        isLoginRequest: false,
        isLoginSuccess: false,
        isLoginError: false,
        loginData: [],
        loginMessage: "",
      };
    }
    case "GET_USER_SUCCESS": {
      return {
        ...state,
        isGetUserRequest: false,
        isGetUserSuccess: true,
        getUserData: action.payload.data,
      };
    }
    case "GET_USER_ERROR": {
      return {
        ...state,
        isGetUserRequest: false,
        isGetUserError: true,
        getUserMessage: action.payload,
      };
    }

    default:
      return state;
  }
};

export default UserReducer;
