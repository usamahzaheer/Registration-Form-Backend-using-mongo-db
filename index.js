const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();


// import routes

const authRoutes = require('./routes/auth');
const postRoute = require('./routes/posts')

// connect to DB
mongoose.connect(
process.env.DB_CONNECT,
{ useNewUrlParser: true },
() => console.log('connected to db!')
);

//Middleware
app.use(express.json());

// routes middlewares

app.use('/api/user', authRoutes);
app.use('/api/posts',postRoute);




app.listen(3000, () => console.log('server up and runing'));