import React, { useEffect, useState } from "react";
import { getUserCart, removeFromUserCart } from "../services/cartsService";
import { Product } from "../interfaces/product";
import Navbar from "./Navbar";
import './Cart.css'; // Ensure this CSS file is included

const Cart = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      getUserCart()
        .then((result) => {
          setCart(result.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }, 1000);
  }, []);

  const handleRemoveFromCart = (productId: string) => {
    if (window.confirm("Are you sure you want to remove this item from the cart?")) {
      removeFromUserCart(productId)
        .then(() => {
          setCart((prevCart) => prevCart.filter((product) => product._id !== productId));
          setShowSuccessMsg(true);
          setTimeout(() => setShowSuccessMsg(false), 2000);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Navbar />

      {isLoading ? (
        <div className="loading">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {cart.length > 0 ? (
            <div className="cart-container">
              <table className="table cart-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product: Product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.description}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.quantity}</td>
                      <td>
                        {product._id && (
                          <button 
                           onClick={() => product._id && handleRemoveFromCart(product._id)}
                            className="btn-delete">
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty-cart-message">Your cart is empty.</p>
          )}
          {showSuccessMsg && <div className="alert alert-success">Item removed successfully!</div>}
        </>
      )}
    </>
  );
};

export default Cart;
