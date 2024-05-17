require('dotenv').config()
const axios = require('axios')
const fetchUser = require('../utils/fetchUsers')
const fetchCoordinates = require('../utils/fetchCoordinates')
const weatherResponseData = require('../utils/dataDesigning')

async function fetchWeatherData(bot, msg) {
    try {
        const foundUser = await fetchUser(msg)
        if (foundUser.length) {
            const coordinates = await fetchCoordinates(foundUser)
            if (!coordinates.length) {
                // console.log('please resubscribe and enter valid city')
                bot.sendMessage(msg.from.id, 'please resubscribe and enter valid city')
            } else {
                if (coordinates.error) {
                    bot.sendMessage(msg.from.id, 'please try again after sometime :)')
                } else {
                    const { latitude, longitude } = coordinates[0]
                    const weatherResponse = await axios.get(process.env.WEATHERURL, {
                        params: {
                            latitude: latitude,
                            longitude: longitude,
                            current: 'temperature_2m,wind_speed_10m',
                            hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m'
                        },
                    })
                    if(weatherResponse)console.log("weatherResponse")
                    weatherResponseData(bot, msg, weatherResponse.data, foundUser[0].city)
                }
            }

        } else {
            bot.sendMessage(msg.from.id, 'Sorry!\nyour data is not present in the Database!\nuse /subscribe to subscribe the service\nThanks!')
        }

    }
    catch (error) {
        if (error.response) {
            console.error('Error:', error.response.status, error.response.data);
        } else {
            console.error('Error:', error.message);
        }
    };
}

module.exports = fetchWeatherData