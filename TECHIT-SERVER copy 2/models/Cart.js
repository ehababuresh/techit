// const mongoose = require("mongoose")

// const cartSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Types.ObjectId,
//         required: true
//     },
//     products: [{
//         productId: String,
//         name: String,
//         price: Number,
//         category: String,
//         description: String,
//         image: String,
//         quantity: Number,
//     }],
//     active: {
//         type: Boolean,
//         required: true
//     }
// });
// const Cart = mongoose.model ("carts", cartSchema) 
// module.exports = Cart;

const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // References to a User document
        required: true,
        ref: 'User' // If you have a User model, you can reference it
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Reference to a Product model
        },
        name: String,
        price: Number,
        category: String,
        description: String,
        image: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'], // Ensure quantity is at least 1
            max: [5, 'Quantity can not exceed 5.'] // Example, if you want to set a max quantity
        },
    }],
    active: {
        type: Boolean,
        required: true,
        default: true // If you want new carts to be active by default
    }
}, {
    timestamps: true // If you want to record when carts are created and updated
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;

