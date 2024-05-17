const mongoose = require('mongoose');
require('dotenv').config()

const url = process.env.DB_URL.replace('username',process.env.DB_USERNAME).replace('password',process.env.DB_PWD)

async function dbconnection(){
    await mongoose.connect(url).then(()=>console.log('DB connected ::',new Date().toISOString())).catch(e=>console.log(e))
}

module.exports = dbconnection
