const jwt = require('jsonwebtoken');
const successHandler = require('../service/successHandler');

let jwtFn = {
    jwtGenerating(userInfo, statudCode, res){
        console.log(userInfo)
        //生成JWT
        let jwtToken = jwt.sign({id : userInfo._id}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_DAYS});
        successHandler(res, jwtToken);
    }
}

module.exports = jwtFn;