const User = require("../../models/User")
const userController  = {
    get_user_details:async (req,res) => {
        const userId = req.userId
        try {
            const user = await User.findById(userId)
            .select(['firstname','lastname','username','phone','email','is_phone_verified','date_created'])
            if (user) {
                return res.status(200).send({
                    status:true,
                    statusCode:200,
                    data:{user}
                })
            } else {
                return res.status(404).send({
                    status:false,
                    statusCode:404,
                    data:{user,message:"User not found"}
                })
            }
        } catch (error) {
            return res.status(500).send({
                status:false,
                statusCode:500,
                message:error.message
            })
        }
    }
}

module.exports = userController