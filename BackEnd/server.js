const app = require('./src/app')
require('dotenv').config();

//Start the server at port 3000
app.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})
