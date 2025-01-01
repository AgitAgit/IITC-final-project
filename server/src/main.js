const express = require("express");
const { json } = require("express");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const usersRouter = require("./routes/usersRoute.js");

const { seedDB } =  require("./utils/seed.js");

dotenv.config();

const uri = process.env.URI;
const localClient = process.env.LOCAL_CLIENT_URL;

const app = express();
const PORT = process.env.PORT || 3000;

mongoose
    .connect(uri)
    .then(async () => {
        console.log("Connected to database. Checking documents...");
        // await seedDB();
    })
    .catch((error) => {
        console.error(
            "Error connecting to the database or running operations:",
            error
        );
    });

app.use(
    cors({
        origin: localClient,
    })
);

app.use(json());

app.use("/users", usersRouter);

app.get("/status", (req, res) => {
    res.send({
        message: "Server is up3",
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});