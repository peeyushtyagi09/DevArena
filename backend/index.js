const express = require("express");
const {PORT} = require("./example.env")
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("he he he");
})

app.listen(PORT, () => {
    console.log("🙌 Server is running on port:🙌", PORT);
});
