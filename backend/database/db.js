const mongoose = require("mongoose");
const {mongoDb} = require("../example.env");
const connectdb = async() => {
    try {
        if(!mongoDb){
            throw new Error("MONGODB_URI is not defined in environment variables")
        }
        await mongoose.connect(mongoDb);
        console.log("🙌 Server is successfully connected to database 🙌")
    }catch(error){
        console.log("❌ Error in Server connecting to database, Error: ❌", error);
        process.exit(1);
    }
};

module.exports = {
    connectdb
}