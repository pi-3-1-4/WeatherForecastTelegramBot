async function handleHelp(bot,msg){
    bot.sendMessage(msg.chat.id,`Hello ${msg.from.first_name}!\nuse /subscribe to subscribe\nuse /unsubscribe to unsubscribe\nuse /weather for current weather report`);
    console.log('help',msg.chat.id,'::',msg.chat.first_name," ",msg.chat.last_name,"::",new Date())
}

module.exports = handleHelp