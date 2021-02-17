const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path")

dotenv.config();
require("./models/db");

const app = express();
app.use(cors());
app.use(express.json());

app.use(require("./routes/UserRoutes"));

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

app.listen(PORT, () => {
  console.log("server connected at", PORT);
});
