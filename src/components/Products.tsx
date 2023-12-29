


import React, { FunctionComponent, useEffect, useState } from "react";
import { Product } from "../interfaces/product";
import { deleteProduct, getAllProducts } from "../services/productsService";
import Navbar from "./Navbar";
import { getIsAdmin } from "../services/usersService";
import { Link } from "react-router-dom";
import { errorMsg, successMsg } from "../services/feedbackservice";
import { addToUserCart } from "../services/cartsService";
import './Products.css'; // Ensure this CSS file is created for styling

interface ProductsProps {}

const Products: FunctionComponent<ProductsProps> = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  useEffect(() => {
    getAllProducts()
      .then((result) => {
        setProducts(result.data);
        return getIsAdmin();
      })
      .then((isAdmin) => {
        setIsAdmin(isAdmin);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (product: Product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      deleteProduct(product._id as string)
        .then(() => {
          setIsChanged(true);
          setShowSuccessMsg(true);
        })
        .catch((err) => errorMsg(err));
    }
  };

  useEffect(() => {
    if (isChanged) {
      getAllProducts()
        .then((result) => {
          setProducts(result.data);
          setIsChanged(false);
        })
        .catch((error) => console.log(error));
    }

    if (showSuccessMsg) {
      successMsg("Product deleted successfully");
      setShowSuccessMsg(false);
    }
  }, [isChanged, showSuccessMsg]);

  const handleAddToCart = (product: Product) => {
    product.quantity = 1;
    addToUserCart(product)
      .then(() => {
        successMsg("Product was added to cart");
      })
      .catch((err) => errorMsg(err));
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h1 className="display-1">Products</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.length ? (
            products.map((product: Product) => (
              <div className="col" key={product._id}>
                <div className="card h-100 product-card">
                  <img src={product.image} className="card-img-top" alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{product.category}</h6>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text text-success">${product.price.toFixed(2)}</p>
                    <div className="btn-group">
                      <button onClick={() => handleAddToCart(product)} className="btn btn-success">
                        <i className="fa-solid fa-cart-plus"></i> Add to Cart
                      </button>
                      {isAdmin && (
                        <>
                          <Link to={`edit/${product._id}`} className="btn btn-secondary">
                            <i className="fa-solid fa-pen-to-square"></i> Edit
                          </Link>
                          <button onClick={() => handleDelete(product)} className="btn btn-danger">
                            <i className="fa-solid fa-trash-alt"></i> Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products in store</p>
          )}
          {isAdmin && (
            <div className="fixed-bottom mb-4 me-4">
              <Link className="btn btn-success rounded-circle btn-lg" to="add">
                <i className="fas fa-plus"></i> Add Product
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
