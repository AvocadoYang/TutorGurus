const User = require('../models/userModel');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const customiError = require('../errorHandler/customiError');
const successHadle = require('../service/successHandler');
const jwtFn = require('../middleware/auth');
const regex = /^(?=.*[a-z])(?=.*[A-Z])/; //密碼必須包含一個大小以及一個小寫

let tutorController = {
    async teacherSignUp(req, res, next){
        try{
            let {userName, email, userPassword, confirmPassword} = req.body;
            let emailCheck = await User.findOne({"email" : email})
            if(emailCheck)
                return next(customiError(400, "該信箱已被註冊"));
            if(!userName || !email || !userPassword || !confirmPassword)
                return next(customiError(400, "欄位未填寫完整"));
            if(!validator.isEmail(email))
                return  next(customiError(400, "信箱格式錯誤"));
            if(!regex.test(userPassword))
                return next(customiError(400, "密碼格式不正確 : 至少包含一個大寫與一個小寫"));
            if(!validator.isLength(userPassword, { min : 8 }))
                return next(customiError(400, "密碼格式不正確 : 至少為8碼"));
            if(userPassword != confirmPassword)
                return next(customiError(400, "密碼不一致"));
            
            let salt = bcrypt.genSaltSync(15);
            let secretPassword = bcrypt.hashSync(userPassword, salt);
            
            let newUser = await User.create({
                name : userName,
                email : email,
                password : secretPassword,
                role : 'T',
            })
            successHadle(res, newUser);
        } catch(err){
            
            return next(err);
        }
    },

    async logIn(req, res, next){
        try {
            const { email, password} = req.body;
            if(!email || !password){
                return next(customiError(400,"無此帳號或密碼"));
            }
            const user = await User.findOne({"email" : email}).select("+password");
            if(!user)
                return next(customiError(400, "無此帳號或密碼輸入錯誤"));
            const auth = await bcrypt.compare(password, user.password);
            if(!auth)
                return next(customiError(400,"密碼錯誤！"));
            await User.findByIdAndUpdate(user["_id"],{status : 1});
            jwtFn.jwtGenerating(user, 200, res);
        } catch(error){
            return next(error)
        }
    }, 

    async logOut(req, res, next){
        findUser = await User.findOne()
    }
}

module.exports = tutorController;