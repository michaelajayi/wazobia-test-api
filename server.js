const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();

app.use(cors());

// Connect Database
connectDB();

// Parse JSON requests || Init JSON Middleware
app.use(express.json({ extended: false }));

// Parse x-www-form-urlencoded requests
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Wazobia Test API..."));

// Define routes
app.use("/api/auth", require("./routes/auth"));
// app.use("/api/items", require("./routes/api/items"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
});
