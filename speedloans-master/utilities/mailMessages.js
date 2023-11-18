const { getMailFile } = require("./utilities");
const mailMessages = {
    RESET_PASSWORD: function (data){
        return getMailFile('../views/mails/resetPassword.html', data)
    },
    WELCOME_MAIL:function (data){
        return getMailFile('../views/mails/welcome.html', data)
    },
}

module.exports = mailMessages
