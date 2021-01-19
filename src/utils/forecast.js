const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=6d5c8373e080e9488fa799f9115226a7&query='+encodeURIComponent(latitude)+','+ encodeURIComponent(longitude)

    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to API\'s',undefined)
        }
        else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            const data = body.current
            const ret = data.weather_descriptions[0] + " temperature: " + data.temperature + " pressure: " + data.pressure
            callback(undefined,ret)
        }
    })

}

module.exports = forecast