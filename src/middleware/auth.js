const jwt = require('jsonwebtoken');
const successHandler = require('../service/successHandler');
const costomiError = require('../errorHandler/customiError');
const User = require('../models/userModel');

let jwtFn = {
    //生成Token
    jwtGenerating(userInfo, statudCode, res){
        console.log(userInfo)
        //生成JWT
        let jwtToken = jwt.sign({id : userInfo._id}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_DAYS});
        successHandler(res, jwtToken);
    },
    //驗證Token
    async isAuth(req, res, next){
        console.log(req.headers.authorization)
        let token;
        //驗證是否夾帶token
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1];
        if(!token)
            return next(costomiError(400, "請先登入"));
        const decryptPayload  = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
                if(err){ 
                    reject(err);
                } else {
                    resolve(payload);
                }
            })
        })
        const currentUser = await User.findById(decryptPayload.id).select('+password');
        req.user = currentUser
        next();
    }

}

module.exports = jwtFn;