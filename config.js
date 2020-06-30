//with dev.config() then we can able to read values from .env file. so 
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  environment: process.env.NODE_ENV,
  port: process.env.PORT
};