const users = require('../db/Schema')
require('dotenv').config()
const fetchUser = require('../utils/fetchUsers')

async function checkAndAddUser(bot,msg,user) {
    const foundUser = await fetchUser(msg)
    if (foundUser.length) {
        const { name, city, country } = foundUser[0]
        bot.sendMessage(msg.from.id, 'your data already present in DataBase \n use /unsubscribe to unsubscribe\nuse /help for help\nNOTE: TO UPDATE YOUR DATA YOU NEED TO UNSUBSCRIBE AND /start again')
        bot.sendMessage(msg.from.id, `You are ${name},\nYour subscribed City is ${city}\nYou are from ${country}`)
        console.log('found existing user',msg.chat.id,'::',msg.chat.first_name," ",msg.chat.last_name,"::",new Date())
    }
    else {
        const newUser = new users(user)
        await newUser.save();
        bot.sendMessage(msg.from.id, `Thanks ${msg.from.first_name} for the subscription!\nNow you will get daily weather in every 5 minutes\nuse /weather for instant update \n`)
        console.log('new user added',msg.chat.id,'::',msg.chat.first_name," ",msg.chat.last_name,"::",new Date())
    }
}

module.exports = checkAndAddUser