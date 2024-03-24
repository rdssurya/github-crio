const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

app.use(cors());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {console.log("Connected to mongoDB");})
    .catch((err) => {console.error("Could not connect", err)});

app.use(express.json());

app.use("/", userRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running");
})

app.listen(PORT, () => {console.log("Server on at", PORT);})