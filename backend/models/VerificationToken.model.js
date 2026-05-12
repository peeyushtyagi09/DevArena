const mongoose = require("mongoose");

const VerificationTokenSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        token: {
            type: String,
            required: true,
            unique: true,
        },
        expiredAt: {
            type: Date,
            required: true, 
        },
    },
    {
        timestamps: true,
    }
);


VerificationTokenSchema.index(
    { expiredAt: 1 },
    { expireAfterSeconds: 0 }
);

module.exports = mongoose.model("VerificationToken", VerificationTokenSchema);