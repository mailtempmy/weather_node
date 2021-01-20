const path = require('path')
const express = require('express')
const hbs= require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
//define paths for express config
const pathPublicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//port from heroku
const port = process.env.PORT || 3000

//setup static directory to serve
app.use(express.static(pathPublicDirectory))

//setup handlebars engine and vies location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Kaili'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About',
        name : 'Kaili'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        name : 'Kaili'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Not Nice'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            return res.send({
                address : req.query.address,
                location : location,
                forecast : forecastData
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Kaili',
        errorMessage : 'Help page not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Kaili',
        errorMessage : 'Page not found!'
    })
})

app.listen(port,()=>{
    console.log('Server is up!')
})