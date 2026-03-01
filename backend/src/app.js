const express = require("express")
const cookieParser = require("cookie-parser")
const app = express()

app.use(cookieParser())
app.use(express.json())

/**
 * require routes
 */

const authRouter = require("./routes/auth.routes")

/**
 * using routes
 */

app.use("/api/auth",authRouter)


module.exports = app