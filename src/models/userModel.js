const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "請輸入姓名"]
    },
    email : {
        type : String,
        required : [ture, "請輸入Email"],
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        require : [true, "請填入帳號"],
        select : false
    },
    role : {
        type : Number,
        select : false
    },
    status : {
        type : Number
    }
},{ versionKey : false});

const User = mongoose.model("User", userSchema);

module.exports = User;
