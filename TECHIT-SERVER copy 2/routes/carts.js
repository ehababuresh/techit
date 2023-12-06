const express = require ("express");
const auth = require("../middlewares/auth");
const joi = require ("joi");
const Cart = require("../models/Cart");
const router = express.Router();

const productsSchema = joi.object({
    name: joi.string().required().min(2),
    price: joi.number().required().min(0),
    category: joi.string().required().min(2),
    description: joi.string().required().min(2),
    image: joi.string().required().min(2),
    quantity: joi.number().required()
});


router.get("/", auth, async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.payload._id });
        if (!cart) return res.status(404).send("No cart for user");
        res.status(200).send(cart.products);
    } catch (error) {res.status(400).send(error);
    }}
    );



router.post("/",auth,async (req,res)=> {
    try {
        
         // joi validation for body
         const { error }= productsSchema.validate(req.body); 
         if (error) return res.status(400).send (error.message)

         // find user cart 
        let cart = await Cart.findOne({ userId : req.payload._id});
         if (!cart) return res.status(400).send("No cart for user")

         //add product to products array
       cart.products.push(req.body)
       await cart.save()
        res.status(200).send(error);
       } catch (error) {
        res.status(400).send(error)
        
    }
});

// Assuming there's a Cart model with a method to remove an item by its ID
router.delete("/:id", auth, async (req, res) => {
    try {
        const userId = req.payload._id; // Assuming this is where you store the user's ID in the payload
        const productId = req.params.productId;
  
        // Find the cart that belongs to the user
        let cart = await Cart.findOne({ userId: userId });
        if (!cart) return res.status(404).send("Cart not found");
  
        // Check if the product exists in the cart
        const productIndex = cart.products.findIndex(item => item.productId === productId);
        if (productIndex === -1) return res.status(404).send("Product not found in cart");
  
        // Remove the product from the cart
        cart.products.splice(productIndex, 1);
        
        // Save the updated cart
        await cart.save();
        res.status(200).send("Product removed from cart successfully");
    } catch (error) {
        res.status(400).send(error);
    }
  });
  


module.exports = router;
