const {Router} = require("express")
const authController = require("../controllers/auth.controller")
const authUser = require("../middlewares/auth.middleware")

const authRouter = Router()

/**
 * @route /api/auth/register
 * @description register an user
 * @access public
 */

authRouter.post("/register",authController.registerUser)

/**
 * @route /api/auth/login
 * @description login an user
 * @access public
 */

authRouter.post("/login",authController.loginUser)

/**
 * @route /api/auth/get-me
 * @description get current logged in user
 * @access private
 */

authRouter.get("/get-me",authUser,authController.getMe)

/**
 * @route /api/auth/logout
 * @description logout
 * @access private
 */

authRouter.get("/logout",authUser,authController.logoutUser)


module.exports = authRouter