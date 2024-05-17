const users = require('../db/Schema')

async function fetchUser(msg){
    const allUsers = await users.find({})
    const foundUser = allUsers.filter(el=>el.telId === msg.from.id)
    return foundUser
}

module.exports = fetchUser