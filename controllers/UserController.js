const User = require("../models/User");

module.exports = {
  async Register(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;
      if (!first_name && !last_name && !email && !password) {
        return res.json({
          success: 0,
          status_code: 400,
          message: "all fields are required",
          data: [],
        });
      }
      const user = await User.findOne({ email });
      if (user) {
        return res.json({
          success: 0,
          status_code: 422,
          message: "this email is already registered",
          data: [],
        });
      }
      const newUser = await User.create({
        first_name,
        last_name,
        email,
        password,
      });
      const accessToken = await newUser.generateToken();
      res.status(201).json({
        success: 1,
        status_code: 201,
        message: "user registered successfully",
        data: [
          {
            first_name,
            last_name,
            email,
            access_token: accessToken,
          },
        ],
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: 0,
        status_code: 500,
        message: "server error, try again later",
        data: [],
      });
    }
  },

  async Login(_, res) {
    try {
      const user = res.locals.user;
      const accessToken = await user.generateToken();
      res.status(201).json({
        success: 1,
        status_code: 201,
        message: "user logged in successfully",
        data: [
          {
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            access_token: accessToken,
          },
        ],
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: 0,
        status_code: 500,
        message: "server error, try again later",
        data: [],
      });
    }
  },

  async Logout(_, res) {
    try {
      const user = res.locals.user;
      user.access_token = null;
      await user.save();
      res.status(201).json({
        success: 1,
        status_code: 201,
        message: "user logged out successfully",
        data: [],
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: 0,
        status_code: 500,
        message: "server error, try again later",
        data: [],
      });
    }
  },

  async GetUserDetails(_, res) {
    try {
      const { first_name, last_name } = res.locals.user;
      res.status(201).json({
        success: 1,
        status_code: 201,
        message: "",
        data: [
          {
            first_name,
            last_name,
          },
        ],
      });
    } catch (err) {
      console.log(error);
      res.json({
        success: 0,
        status_code: 500,
        message: "server error, try again later",
        data: [],
      });
    }
  },
};
