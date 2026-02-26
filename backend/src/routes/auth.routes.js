const { Router } = require("express");
const authController = require("../controllers/auth.controller")
const authRouter = Router()

/**
 * @route /api/auth/register
 * @description register user
 * @access public
 */

authRouter.post("/register",authController.registerUser)

/**
 * @route /api/auth/login
 * @description login user
 * @access public
 */

authRouter.post("/login",authController.loginUser)

module.exports = authRouter