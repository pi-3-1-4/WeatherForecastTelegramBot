const checkAndAddUser = require('../handlers/usersHandler')

async function handleSubscription(bot,msg){
    let [name,city,country] = ['','','']
    const namePrompt = await bot.sendMessage(msg.chat.id, "Hi, what's your name?", {
        reply_markup: {
            force_reply: true,
        },
    });
    bot.onReplyToMessage(msg.chat.id, namePrompt.message_id, async (nameMsg) => {
        name = nameMsg.text;
        await bot.sendMessage(msg.chat.id, `Hello ${name}!`);  
        //city
        const cityPrompt = await bot.sendMessage(msg.chat.id, "Tell me about your city", {
            reply_markup: {
                force_reply: true,
            },
        });
        bot.onReplyToMessage(msg.chat.id, cityPrompt.message_id, async (nameMsg) => {
            city = nameMsg.text;    

            //country
            const countryPrompt = await bot.sendMessage(msg.chat.id, "Ok!\nnow let me know your country", {
                reply_markup: {
                    force_reply: true,
                },
            });
            bot.onReplyToMessage(msg.chat.id, countryPrompt.message_id, async (nameMsg) => {
                country = nameMsg.text;
                await bot.sendMessage(msg.chat.id, `your country is ${country}!`);   
                city = city.toLowerCase()
                city = city[0].toUpperCase() + city.slice(1)
                country = country.toLowerCase()
                country = country[0].toUpperCase() + country.slice(1)
                //database enquiry and operqations
                const userInfo = {
                    telId:msg.from.id,
                    name,
                    city,
                    country,
                    status:true
                }
                await checkAndAddUser(bot,msg,userInfo)

            });
        });
    });
}

module.exports = handleSubscription;