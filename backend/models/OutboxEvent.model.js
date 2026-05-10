const mongoose = require("mongoose");

const OutboxEventSchema = new mongoose.Schema(
    {
        eventType: {  
            type: String,
            required: true,
            trim: true,
        },
        // 'payload' is designed to store any kind of data (string, object, array, etc.).
        // 'mongoose.Schema.Types.Mixed' is a special type in Mongoose allowing any value (not enforcing a schema).
        // You still need to reference it as shown below, since it's the built-in Mongoose flexible type.
        payload: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        status: {
            type: String,
            enum: ["PENDING", "PROCESSING", "PUBLISHED", "FAILED"], 
            default: "PENDING",
        },
        retryCount: {
            type: Number, 
            default: 0,
            min: 0,
        },
        processedAt: {
            type: Date,
        }, 
        errorMessage: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// This creates a compound index on the 'status' and 'createdAt' fields.
// It helps MongoDB to efficiently query OutboxEvent documents by their status (e.g., "PENDING")
// and by the order they were created, which can speed up operations like picking the oldest event of a particular status.
OutboxEventSchema.index({ status: 1, createdAt: 1 });

module.exports = mongoose.model("OutboxEvent", OutboxEventSchema); 