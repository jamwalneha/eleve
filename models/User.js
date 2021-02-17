const { Schema, model } = require("mongoose");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { ObjectId } = Schema.Types;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: null,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    access_token: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.findByEmailAndPassword = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Incorrect Credentials");
    const isMatched = await compare(password, user.password);
    if (!isMatched) throw new Error("Incorrect Credentials");
    return user;
  } catch (err) {
    err.name = "AuthError";
    throw err;
  }
};

userSchema.methods.generateToken = async function () {
  const user = this;
  const accessToken = sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "12h",
  });
  user.access_token = accessToken;
  await user.save();
  return accessToken;
};

userSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (user.isModified("password")) {
      const hashedPassword = await hash(user.password, 10);
      user.password = hashedPassword;
      next();
    }
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

const User = model("User", userSchema);
module.exports = User;
