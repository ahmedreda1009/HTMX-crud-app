const express = require("express");
const cors = require("cors");

const blogsRoute = require("./routes/blogsRoute");

const app = express();
app.use(cors());

// post requests middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/blogs", blogsRoute);

module.exports = app;
