import { FunctionComponent, useEffect, useState } from "react";
import { getUserCart, removeFromUserCart } from "../services/cartsService";
import { Product } from "../interfaces/product";
import Navbar from "./Navbar";

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    getUserCart()
      .then((result) => {
        setCart(result.data);
        console.log(cart);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRemoveFromCart = (productId: string) => {
    removeFromUserCart(productId)
      .then(() => {
        // אם המחיקה הצליחה, עדכן את העגלה לפי התוצאה המעודכנת
        setCart((prevCart) => prevCart.filter((product) => product._id !== productId));
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <>
      <Navbar />
      {cart.length > 0 && (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product: Product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                 <button onClick={() => product._id && handleRemoveFromCart(product._id)}>Delete</button>
                   </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Cart;
