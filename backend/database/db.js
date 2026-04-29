const mongoose = require("mongoose");
const {mongoDb} = require("example.env");
const connectdb = async() => {
    try {
        await mongoose.connect(mongoDb);
        console.log("🙌Server is successfully connected to database 🙌")
    }catch(error){
        console.log("❌ Error in Server connecting to database, Error: ❌", error);
    }
};

module.exports = {
    connectdb
}