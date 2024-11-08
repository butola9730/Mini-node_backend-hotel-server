const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();
const passport = require('./auth');

const PORT = process.env.PORT || 3000



//Middleware function
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body

//Middleware function
const logRequest=(req, res,  next)=>{
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next(); //Move on to the next phase
}

app.use(logRequest);



app.use(passport.initialize());
const localAuthMiddleware =passport.authenticate('local', {session: false});

app.get("/",  function (req, res) {
  res.send("Welcome To Our Hotel");
});


//Import the Menu rotes files
const menuRoutes = require("./routes/menuRoutes");

//Use the  menu routes
app.use("/menu",menuRoutes);



//Import the Person routes files
const personRoutes = require("./routes/personRoutes");

//Use the person routes
app.use("/person" ,localAuthMiddleware, personRoutes);



//Listen Server


app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
