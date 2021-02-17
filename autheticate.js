const User = require("./models/User");
const { verify } = require("jsonwebtoken");

module.exports = {
  async AuthenticateLocal(req, res, next) {
    try {
      if (req.body.email && req.body.password) {
        const user = await User.findByEmailAndPassword(
          req.body.email,
          req.body.password
        );
        res.locals.user = user;
        return next();
      }
      res.json({
        success: 0,
        status_code: 400,
        message: "all fields are required",
        data: [],
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: 0,
        status_code: 401,
        message: "incorrect email or password",
        data: [],
      });
    }
  },

  async AuthenticateJWT(req, res, next) {
    try {
      if (req.headers.access_token) {
        const { id } = verify(
          req.headers.access_token,
          process.env.JWT_SECRET_KEY
        );
        const user = await User.findById(id);
        if (!user) {
          return res.json({
            success: 0,
            status_code: 403,
            message: "unauthorized access request",
            data: [],
          });
        }
        res.locals.user = user;
        return next();
      }
      return res.json({
        success: 0,
        status_code: 403,
        message: "unauthorized access request",
        data: [],
      });
    } catch (error) {
      console.log(error);
      return res.json({
        success: 0,
        status_code: 500,
        message: "server error",
        data: [],
      });
    }
  },
};
