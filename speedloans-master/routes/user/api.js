const { get_user_details } = require("../../controllers/users/userController")
//this is the router that manages all the users and user activities ...
const userRouter = require("express").Router()
userRouter.get("/user-details",get_user_details)
module.exports = userRouter