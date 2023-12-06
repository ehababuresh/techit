const express = require('express');
const mongoose = require ("mongoose")
require ("dotenv").config()
const register = require ("./routes/register");
const login = require ("./routes/login");
const profile = require ("./routes/profile");
const products = require ("./routes/products");
const carts = require ("./routes/carts");
const cors = require ("cors")

const PORT = process.env.PORT || 6000;
const app = express();

app.use(express.json())

app.use(cors());

mongoose.connect(process.env.db,{useNewUrlParser:true})
.then (()=> console.log ("MongoDB connected successfully!"))
.catch((err)=> console.log(err));

app.use("/api/register",register);
app.use("/api/login",login);
app.use("/api/profile",profile);
app.use("/api/products",products);
app.use("/api/carts",carts);

app.listen(PORT, () => console.log ("Server started on port", PORT));

