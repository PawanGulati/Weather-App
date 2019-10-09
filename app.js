const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express();

app.set("view engine","hbs");
const publicPath = path.join(__dirname,'./public');
const partialPath = path.join(__dirname,'./views/partials');

app.use(express.static(publicPath));
hbs.registerPartials(partialPath);

app.get('',(req,res)=>{
    res.render('index')
})

app.get('/form',(req,res)=>{
    res.render('form')    
})

app.get('/weather',(req,res)=>{
    const address = req.query.search
    if(!address){
        return res.send({
            Error: 'Hey ya cuz pls provide search term'
        })
    }
    geocode(address,(error,{Place,latitude,longitude}={})=>{
        // console.log(data.body)
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude,(err,{temperature,precipProbability})=>{
            if(err) return res.send({ error})

            res.send({
                Place,latitude,longitude,temperature,precipProbability
            })
        })
        
        // res.send(data)
    })

})

app.get('*',(req,res)=>{
    res.render('404')
})

app.listen('3000',()=>{
    console.log('server\'s running at 3000')
})

