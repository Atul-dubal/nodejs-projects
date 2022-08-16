const express = require("express");
const path = require("path");
const Router = express.Router();
const requests = require('requests');
const ytdl = require("ytdl-core");
Router.get("/",(req,res)=>{
  res.render("index");
})

//Weather Application Code
Router.get('/weather',(req,res)=>{
  res.render("weather");
})

Router.post("/weather",(req,res)=>{
  const city = req.body.cityname;
 // console.log(city);
 
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city} &appid=56c39d27a11640d544df9b82d70f0f8f`;
function getData(){

  requests(api).on("data",(chunk)=>{
  const arrObj = JSON.parse(chunk);
  if(!arrObj.message){
    
    const temp =  arrObj.main.temp-273;
    const newtemp =  temp.toFixed(2);
  
  const tempStatus =  arrObj.weather[0].main;
  //console.log(tempStatus);
  
 
    res.render("weather",{
      cityname:arrObj.name,
      country: arrObj.sys.country,
      temp:newtemp,
      WeatherStatus:tempStatus
      
    })

 
}
else{
  res.render("weather",{
      response:"error"
    })
}

});
}
getData();
});

//YouTube Video Downloader code 
Router.get("/youtube",(req,res)=>{
  res.render("youtube");
})

Router.post("/youtubeDownload",async (req,res)=>{
    const yturl = req.body.search;
    console.log(yturl);
    const info = await ytdl.getInfo(yturl);
  //  console.log(info);
    const embedurl = info.videoDetails.embed.iframeUrl;
    //console.log(embedurl);
    const formateData = info.formats;
  //  console.log(formateData);
    res.render("youtubeDownload",{
     embedUrl : embedurl,
     formate:formateData
   });
})


module.exports = Router;