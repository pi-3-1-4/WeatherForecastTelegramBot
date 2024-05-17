
async function handleStart(bot,msg){
    bot.sendMessage(msg.chat.id,`Hello ${msg.chat.first_name}, use /help to know the bot commands.`)
    console.log('start',msg.chat.id,'::',msg.chat.first_name," ",msg.chat.last_name,"::",new Date())
}

module.exports = handleStart