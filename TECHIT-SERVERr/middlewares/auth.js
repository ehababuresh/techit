const jwt = require ("jsonwebtoken")


module.exports = (req,res,next) => {

    try {
        // get the token from headers

        let token = req.header ("Authorization")
        if(!token) return res.status(401).send ("no token was provided")
        
// check the token - verify 

const payload=jwt.verify (token,process.env.jwtKey)


//save payload 
req.payload = payload;


 next ()
    
    } catch (error) {
        res.status(400).send(error)
    }
}
