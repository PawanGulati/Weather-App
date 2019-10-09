const request = require("request");

const geocode = (addr,callBack)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(addr)+".json?access_token=pk.eyJ1IjoiYW5vbnltb3VzYm95IiwiYSI6ImNrMWZ3OWFxODB2cjkzbW8zeGx2NGdrYzUifQ.b3gQ12OeKL-Nk_4OCmOHQQ";

    request({url,json:true},(err,{body}={})=>{
        if(err){
            callBack(` Bruh, ur Network's shit, checkout there's a problem `);
        }
        else if(!body.features.length){
            callBack(`Sry, can't find the matchin' result `);
        }
        else{
            let data = {
                Place : body.features[0].place_name,
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0]
            }

            callBack(undefined,data);
        } 
    })
    
}

module.exports =  geocode; 