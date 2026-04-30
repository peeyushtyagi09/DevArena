require("dotenv").config();

const PORT = process.env.PORT;
const mongoDb = process.env.mongoDb_uri; 
module.exports = {
    PORT, 
    mongoDb
};