require("dotenv").config();

const requireEnv = ["PORT", "MONGODB_URI"];

requireEnv.forEach((key) => {
    if(!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
});

const PORT = process.env.PORT;
const mongoDb = process.env.mongoDb_uri

module.exports = {
    PORT, 
    mongoDb
};