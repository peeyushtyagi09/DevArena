require("dotenv").config();

const requireEnv = ["PORT", "MONGODB_URI"];

requireEnv.forEach((key) => {
    if(!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});

const PORT = process.env.PORT;
const mongoDb = process.env.mongoDb_uri;
const salt_value = process.env.salt_value;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REHRESH_EXPIRES_IN = process.env.JWT_REHRESH_EXPIRES_IN;

module.exports = {
    PORT, 
    mongoDb, 
    salt_value, 
    JWT_ACCESS_SECRET, 
    JWT_ACCESS_EXPIRES_IN,
    JWT_REFRESH_SECRET, 
    JWT_REHRESH_EXPIRES_IN
};