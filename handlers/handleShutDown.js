require('dotenv').config()

async function handleShutDown(bot, msg) {
    if (msg.from.id !== parseInt(process.env.ADMIN_ID)) {
        bot.sendMessage(msg.from.id,'You are not Admin')
    } else {
        bot.sendMessage(msg.from.id,'SERVER SHUT!')
        console.log('server shut down',msg.chat.id,'::',msg.chat.first_name," ",msg.chat.last_name,"::",new Date())
        console.log('may-day\nmay-day\nmay-day')
        process.exit(0)
    }
}

module.exports = handleShutDown