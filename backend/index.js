const express = require("express");
const {PORT} = require("./example.env");
const {connectdb} = require("./database/db");
const {redisClient} = require("./config/redis");
const { connectRabbitMQ } = require("./config/rabbitmq");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Api is running"
    });
});

app.use((req, res) => {
    res.status(400).json({
        success: false, 
        message: "Route not found"
    });
});


const startServer = async () => {
    try {
        await connectdb();  
        await connectRabbitMQ();
        if(!PORT) {
            throw new Error("❌ PORT is not provided to start a server. ❌");
        }
        const server = app.listen(PORT, () => {
            console.log(`Server running on PORT ${PORT}`);
        });

        process.on("SIGINT", async () => {
            console.log("Shutting down server...");

            server.close(() => {
                console.log("HTTP server closed");
            });

            const mongoose = require("mongoose");
            await mongoose.connection.close();

            await redisClient.quit();
            console.log("Redis disconnected");
            process.exit(0);
        });
    }catch(error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();