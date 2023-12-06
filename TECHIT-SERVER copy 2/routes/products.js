const express = require("express");
const auth = require("../middlewares/auth");
const Product = require ("../models/Product")
const joi = require ("joi")
const _ = require ("lodash");
const router = express.Router();



const productsSchema = joi.object({
    name: joi.string().required().min(2),
    price: joi.number().required().min(0),
    category: joi.string().required().min(2),
    description: joi.string().required().min(2),
    image: joi.string().required().min(2)
})


router.delete("/:id", auth, async (req, res) => {
    try {
        // check if the user is admin
        if (!req.payload.isAdmin)
        return res.status(400).send("Only admin can edit products");
        let product = await Product.findOneAndRemove({ _id: req.params.id });
        if (!product) return res.status(404).send("No such product");
        res.status(200).send("Product removed successfully");
    } catch (error) {
        res.status(400).send(error);
    }
})
;



router.put("/:id", auth, async (req, res) => {
    try {
        // check if the user is admin

        if (!req.payload.isAdmin)
         return res.status(400).send ("only admin can edit products");

        // joi validation for body

        const { error }= productsSchema.validate(req.body); 
        if (error) return res.status(400).send (error.message)

        // edit the product in db
        let product = await Product.findOneAndUpdate({_id: req.params.id},req.body,{new:true});
        if (!product) return res.status(404).send ("No such product") 

        // send the update product details
        res.status(201).send(product);
        } catch (error) {
        res.status(400).send(error);
        }
})


router.get("/:id", auth, async (req, res) => {
    try {
        let product = await Product.findOne({_id: req.params.id})
       if (!product) return res.status(404).send("No such product")
       res.status(200).send(product)
    } catch (error) {
        res.status (400).send (error);
    }
});



router.get("/", auth, async (req, res) => {
    try {
        let products = await Product.find();
        res.status(200).send(products);
    } catch (error) {
        res.status (400).send (error)
    }
});


router.post("/", auth, async (req, res) => {
    try {
        // check if the user is admin

        if (!req.payload.isAdmin)
         return res.status(400).send ("only admin can add products");

        // joi validation for body

        const { error }= productsSchema.validate(req.body); 
        if (error) return res.status(400).send (error.message)

        // add the product to db
        let product = new Product(req.body);
        await product.save(); 

        // send the new product details
        res.status(201).send(product);
        } catch (error) {
        res.status(400).send(error);
        }
})


module.exports = router;
