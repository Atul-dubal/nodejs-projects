// require Modules
const express = require("express");
const path = require("path");
const Router= require("./routes");
const bodyparser = require("body-parser");
const hbs = require("hbs");


// Various Important Variable 
const app = express();
const port = process.env.PORT || 2206;
const viewspath = path.join(__dirname,"../templates/views")
//Middleware static folder for css js files
app.use(express.static(path.join(__dirname,"../public")));
//body parser for form data getting 
app.use(bodyparser.urlencoded({
  extended:false}));
app.use(bodyparser.json());
app.set("view engine","hbs");
app.set("views",viewspath)
hbs.registerPartials(path.join(__dirname,"../templates/partials"));
//Get All Routes 
app.use("/",Router);


// Listen On 2206 Port 
app.listen(port,()=>{
  console.log("Server Is running At Port ::"+port);
});
