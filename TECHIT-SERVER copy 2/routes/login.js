const express = require ("express")
const User = require ("../models/User")
const joi = require ("joi")
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require ("jsonwebtoken");


const loginSchema = joi.object({
    
    email: joi.string().required().min(6).email(),
    password: joi.string().required().min(8),
    
});

router.post("/", async (req,res)=> {
    try {
        // joi validation
        const { error } = loginSchema.validate(req.body);
        if (error) return res.status(400).send(error.message);
    
        // check for existing user
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("wrong email or password");
        // decrypt password

        const result = await bcrypt.compare(req.body.password, user.password);
        if (!result) return res.status(400).send("wrong email or password");

      // create token
       const genToken = jwt.sign(
      { _id: user._id, isAdmin: user.isAdmin },
       process.env.jwtKey
          );
        await user.save();
        res.status(201).send({ token: genToken });
         } catch (error) {
            res.status(400).send(error);
         }
             }); 

           module.exports = router;
