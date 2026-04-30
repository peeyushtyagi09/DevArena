const express = require("express");
const {PORT} = require("./example.env")
const {connectdb} = require("./database/db");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.send("he he he");
})

// connecting datavase from server
connectdb();

app.listen(PORT, () => {
    console.log("🙌 Server is running on port:🙌", PORT);
});
