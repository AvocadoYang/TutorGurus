const mongoose = require('mongoose');
function connectDB(){
    const url = process.env.MONGODB_CONNECTPATH.replace('<password>', process.env.MONGODB_PASSWORD);
    mongoose.connect(url).then(()=>console.log('connect successfully !'))
};
module.exports = connectDB;
