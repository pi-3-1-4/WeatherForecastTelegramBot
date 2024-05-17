const cron = require('node-cron')
const user = require('../db/Schema');
const fetchWeatherData = require('./handleWeather');
require('dotenv').config()

async function handleDailyUpdate(bot, msg) {
    if (msg.from.id !== parseInt(process.env.ADMIN_ID)) {
        bot.sendMessage(msg.from.id,'You are not Admin')
    } else {
        cron.schedule(`*/30 * * * *`, () => {
            sendDaily();
            console.log(`Weather update sent in every 30 minsutes at${new Date()}`);
        });
        async function sendDaily() {
            const allData = await user.find({});
            for (let i in allData) {
                const msg = { from: { id: allData[i].telId }, date: new Date().getTime() }
                fetchWeatherData(bot, msg)
            }
        }
    }
}

module.exports = handleDailyUpdate