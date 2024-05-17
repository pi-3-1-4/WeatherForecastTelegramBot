const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config()
const dbconnection = require('../db/dbConnection')

const handleSubscription = require('../handlers/handleSubscription');
const handleStart = require('../handlers/handleStart')
const handleUnsubscribe = require('../handlers/handleUnsubscribe')
const handleWeather = require('../handlers/handleWeather')
const handleDailyUpdate = require('../handlers/handleDailyUpdate');
const handleHelp = require('../handlers/helpHandler');
const handleShutDown = require('../handlers/handleShutDown');

const bot = new TelegramBot(process.env.TOKEN, { polling: true });
dbconnection()

//endpoints
bot.onText(/\/start/, async msg =>{handleStart(bot,msg)});

bot.onText(/\/help/, async msg =>{handleHelp(bot,msg)});

bot.onText(/\/subscribe/,async msg=>{handleSubscription(bot,msg)});

bot.onText(/\/unsubscribe/,async msg=>{handleUnsubscribe(bot,msg)})

bot.onText(/\/weather/,async msg=>{handleWeather(bot,msg)})

bot.onText(/\/daily/,async msg=>{handleDailyUpdate(bot,msg)})

//bot.onText(/\/shutdown/,async msg=>{handleShutDown(bot,msg)})

setTimeout(()=>{
    console.log('Server initialised at ::',new Date().toISOString())
})

