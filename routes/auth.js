const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');




router.post('/register' , async (req, res)=>{

   // Lets validate if the user already in the database
   const emailExists = await User.findOne({email: req.body.email});
   if(emailExists) return res.status(400).send('Email already exists');

   //Hash Password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    //Create a new user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password:hashedPassword 
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser);
     }catch(err){
         res.status(400).send(err);
     }
     
});

//LOGIN PART
router.post('/login', async (req, res) =>{
    //checking if the email exists 
    const user = await User.findOne ({email: req.body.email});
    if(!user) return res.status(400).send('Email is not found');
    //checking password 
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password')
     //Create and assign and a token
     const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
     res.header('auth-token', token).send(token);

   
});


module.exports = router;