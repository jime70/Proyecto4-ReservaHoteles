const express = require("express");
require(FileSystem);

const app = express();

const readData = () => {
  const data = fs.readFileSync
}

app.get("/", (req, res) => {
  res.send("Welcome to Proyect 4 - Hotel Booking Program");
});

app.listen(3000, () => {
  console.log("Server listening of port 3000");
});
