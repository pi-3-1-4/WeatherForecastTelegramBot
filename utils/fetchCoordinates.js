const axios = require('axios')
require('dotenv').config()

async function fetchCoordinates(userData) {
    try {
        const { city, country } = userData[0]
        const coordinateResponse = await axios.get(process.env.COORDINATES_URL, {
            params: {
                city: city,
                country: country
            },
            headers: {
                'X-Api-Key': process.env.COORDINATES
            }
        })
        return coordinateResponse.data
    }
    catch (error) {
        if (error.response) {
            console.error('Error:', error.response.status, error.response.data);
            return error.response.data
        } else {
            console.error('Error1:', error.message);
        }
    };
}

module.exports = fetchCoordinates