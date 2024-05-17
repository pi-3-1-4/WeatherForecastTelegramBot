const users = require('../db/Schema')

async function handleUnsubscribe(bot,msg){
    
    try{
        const result = await users.deleteOne({telId :msg.from.id})
        if(result.deletedCount){
            bot.sendMessage(msg.from.id,'We hate to see you go\n Thanks for using our service\n/subscribe to subscribe the service again')
            console.log('unsubscribed and user deleted',msg.chat.id,'::',msg.chat.first_name," ",msg.chat.last_name,"::",new Date())
        }else{
            throw result
        }
    }catch(e){
        bot.sendMessage(msg.from.id,'Your data does not exist in our DB!\nPlease /subscribe first')
        console.log('false unsubscribed',msg.chat.id,'::',msg.chat.first_name," ",msg.chat.last_name,"::",new Date())
    }
}

module.exports = handleUnsubscribe