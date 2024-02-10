const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const blogRoute = require('./routes/blogRoutes') 



const app = express();
app.use(express.json());
app.use('/posts', blogRoute);

app.listen(process.env.PORT, ()=>{
    try {
        mongoose.connect(process.env.mongoURL)
        console.log(`Server listening on port ${process.env.PORT} and mongo is connected!`);
    } catch (error) {
        console.log(error)
    }
})