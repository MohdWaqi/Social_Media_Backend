const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const blogRoute = require('./routes/blogRoutes') 
const authRoute = require('./routes/authorization')


const connectDB = async () => {
    try {
      await mongoose.connect(process.env.mongoURL);
      console.log('MongoDB Connected');
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }


const app = express();
app.use(express.json());
app.use('/users', authRoute)
app.use('/posts', blogRoute);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("listening for requests");
    })
})