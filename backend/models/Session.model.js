const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Objects.Types("user"),
        }

    },{
        timestamps: true
    }
);

module.exports = mongoose.model("session", sessionSchema);