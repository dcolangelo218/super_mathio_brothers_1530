const express = require("express");
const cors = require("cors");
const playerRoutes = require("./routes/playerRoutes");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/players", playerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
