const mongoose = require("mongoose");
const {
    generateAccessToken, 
    generateRefreshToken, 
    verifyAccessToken, 
    verifyRefreshToken
} = require("../utils/jwt.js");
const {
    ConflictError
} = require("../utils/error.js");
const signupcontroller = (req, res) => {
    
    const user = req.body({ username, email, password });
    
    if(mongoose.find(user)){
        ConflictError
    };
    // hashpassword we are doing in the models
    mongoose.create(user);
    generateAccessToken(user);
    generateRefreshToken(user);
    

    
}