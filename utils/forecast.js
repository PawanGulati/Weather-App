const request = require("request");


const forecast = (latitude,longitude,callBack)=>{
    
    const url = `https://api.darksky.net/forecast/6138e559f7e067e66df761fdf35f1579/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}/?units=si`;
    // console.log(url);
    request({url,json:true},(err,{body})=>{
        // console.log(res.body);
        if(err){
            callBack(` Bruh, ur Network's shit checkout there's a problem `);
        }
        else if(body.error){
            callBack(` Sry, can't find the matchin' result `);
        }
        else{
            let data = {
                precipProbability : body.currently.precipProbability,
                temperature : body.currently.temperature
            }

            callBack(undefined,data)
        }
    })
}

module.exports = forecast;