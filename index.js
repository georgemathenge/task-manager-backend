const app = require('./src/app');
require('dotenv').config();
const serverless = require('serverless-http');  // Needed for Vercel

PORT = process.env.PORT || 4007
const ip = '192.168.100.7'
// module.exports.handler = serverless(app);  
app.listen(PORT,ip, () => {
    console.log(`Server running on port ${PORT}`);
  });
