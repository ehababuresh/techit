const express = require ("express")
const auth= require ("../middlewares/auth");
const User = require("../models/User");
const _ = require ("lodash");
const router = express.Router();



router.get("/",auth, async (req,res)=> {

try {
    let user = await User .findById (req.payload._id)
     if (!user) return res.status (400).send ("error is profile")
     res.status (200).send (_.pick (user, ["_id", "name" , "email","isAdmin"]))
     
} catch (error) {
    res.status(400).send (error)
    
}

});
module.exports = router ; 