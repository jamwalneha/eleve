const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  Logout,
  GetUserDetails,
} = require("../controllers/UserController");
const { AuthenticateLocal, AuthenticateJWT } = require("../autheticate");

router.post("/register-user", Register);
router.post("/login-user", AuthenticateLocal, Login);
router.delete("/logout-user", AuthenticateJWT, Logout);

router.get("/get-user-details", AuthenticateJWT, GetUserDetails);

module.exports = router;
