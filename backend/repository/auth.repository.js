const User = require("../model/User.model");
const Session = require("../model/Session.model");
const VerificationToken = require("../model/VerificationToken.model");
const OutboxEvent = require("../OutboxEvent/model");


// user ke function

// this function is find user by email
const findUserByEmail = async (email) => {
    return await User.findOne({ email });
}

//  this is use to find user by Id

const findUserById = async (userId) => {
    return await User.findById({ userId });
}

// this is use to create  user
const createUser = async (userData) => {
    return await User.create({ userData })
}

//  end

// Session Queries

// this is use to create session
const createSession = async (sessionData) => {
    return await Session.create({ sessionData });
};

// this is use to find session by refreshToken

const findSessionByToken = async (refreshToken) => {
    return await Session.findOne({ refreshToken });
};

// this is to delete session

const deleteSession = async (refreshToken) => {
    return await Session.deleteOne({ refreshToken });
};

// this is use to delete user all session
const deleteAllUserSession = async (userId) => {
    return await Session.deleteMany({ userId });
};

// end

// verifucation Token Queries

// that is use to create verification Token
const createVerificationToken = async (tokenData) => {
    return await VerificationToken.create({ tokenData });
};

//  this is use to find the token
const findVerificationToken = async (token) =>{
    return await VerificationToken.findOne({ token });
};

// this is use to delete the token
const deleteVerificationToken = async (token) => {
    return await VerificationToken.deleteOne({ token });
};

// end 

// outBox event Queries
// this is use to create to create evnet to token

const createOutboxEvent = async (eventData) => {
    return await OutboxEvent.create({ eventData });
};

module.exports = {
    findUserByEmail, 
    findUserById,
    createUser,
    createSession,
    findSessionByToken,
    deleteSession,
    deleteAllUserSession,
    createVerificationToken,
    findVerificationToken,
    deleteVerificationToken,
    createOutboxEvent,
}