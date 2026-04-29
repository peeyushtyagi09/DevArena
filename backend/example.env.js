require("dotenv").config();

const PORT = process.env.PORT;
const mongoDb = process.env.mongoDb;
module.exports = {
    PORT, 
    mongoDb
};