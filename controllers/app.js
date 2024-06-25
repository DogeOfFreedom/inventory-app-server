/* eslint-disable import/newline-after-import */
const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());

// cors setup
const cors = require("cors");
const allowedOrigin = process.env.ORIGIN || "http://127.0.0.1:5173";
app.use(cors({ origin: allowedOrigin, methods: "GET, POST, DELETE, PUT" }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Cloudinary
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dhtsrj5lb",
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// Connect to db
const devDbUrl =
  "mongodb+srv://admin:hfvlx7N14a2kyFfY@cluster0.lgqmgz4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoDB = process.env.MONGODB_URI || devDbUrl;
mongoose.connect(mongoDB).then(() => console.log("connected to db"));

const general = require("../routers/general");
app.use(general);

const signedUploadForm = require("../routers/signedUploadForm");
app.use("/api/signuploadform", signedUploadForm);
