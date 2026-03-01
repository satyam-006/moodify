const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  res.cookie("token", token);

  res.status(201).json({
    message: "User registerd successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  const { username, email, password } = req.body;

  const user = await userModel
    .findOne({
      $or: [{ username }, { email }],
    })
    .select("+password");

  if (!user) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  res.cookie("token",token);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid Credentials",
    });
  }

  res.status(200).json({
    message: "User logged in successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

async function getMe(req, res) {
  const userId = req.user.id;

  const user = await userModel.findById(userId);

  res.status(200).json({
    message: "user fetched successfully",
    user,
  });
}

async function logoutUser(req, res) {
  const token = req.cookies.token;

  res.clearCookie("token", token);

  await redis.set(token, Date.now().toString());

  res.status(200).json({
    message: "logout successfully",
  });
}

module.exports = { registerUser, loginUser, getMe, logoutUser };
