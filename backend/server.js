const express = require("express");
const playerRoutes = require("./routes/playerRoutes");
const questionRoutes = require("./routes/questionRoutes");

const app = express();
app.use(express.json());

app.use("/api/player", playerRoutes);
app.use("/api/questions", questionRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

