const mongoose = require('mongoose')

const requirementSchema = new mongoose.Schema({
    userId:{type:String,required:true,unique:true},
    transaction_pin:{type:String,default:null},
    is_eligible:{type:String,default:true},
    status:{type:String,default:"ACTIVE"},
    date_created:{type:Date,default:Date.now()},
    date_updated:{type:Date,default:Date.now()},
})

const TransactionRequirement = mongoose.model("TransactionRequirement",requirementSchema)
module.exports = TransactionRequirement