const express = require('express');
const aiRoutes = require('./routes/ai.routes')
const app = express(); // Create an server
const cors = require('cors'); // To share resources with froAIntend

app.use(express.json()) //Middleware only for post method
app.use(cors());

app.get("/",(req, res)=>{
    res.send("Hello World!");
})

app.use('/ai', aiRoutes);

module.exports = app;