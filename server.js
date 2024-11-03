const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();
const PORT = process.env.PORT || 3000

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body



app.get("/", function (req, res) {
  res.send("Welcome To Our Hotel");
});


//Import the Menu rotes files
const menuRoutes = require("./routes/menuRoutes");

//Use the  menu routes
app.use("/menu",menuRoutes);



//Import the Person routes files
const personRoutes = require("./routes/personRoutes");

//Use the person routes
app.use("/person", personRoutes);



//Listen Server


app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
