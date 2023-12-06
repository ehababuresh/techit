const express = require ("express")
const User = require ("../models/User")
const joi = require ("joi")
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require ("jsonwebtoken");
const Cart = require("../models/Cart");

const registerSchema = joi.object({
    name: joi.string().required().min(2),
    email: joi.string().required().min(6).email(),
    password: joi.string().required().min(8),
    isAdmin: joi.boolean().required(),
});

router.post("/", async (req,res)=> {
    try {
        // joi validation
        const { error } = registerSchema.validate(req.body);
        if (error) return res.status(400).send(error.message);
    
        // check for existing user
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send("User already exists");
    
        // create user
        user = new User(req.body);
    
        // encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        // create cart for user
        let cart = new Cart({ userId: user._id, products: [],
         active: true });
         await cart.save();

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
