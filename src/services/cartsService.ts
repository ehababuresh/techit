import axios from "axios";
import { Product } from "../interfaces/product";
import _, { omit } from "lodash";

const api: string = process.env.REACT_APP_API || "";
// const api = process.env.REACT_APP_API_URL;

// get user Cart
export const getUserCart = (): Promise<any> =>
    axios.get(`${api}Carts`, {
        headers: { Authorization: `${sessionStorage.getItem("token")}` }
    });



  // add to user cart
export const addToUserCart = (product: Product): Promise<any> => {
    let body = _.omit(product, ['_id', '__v']);
    return axios.post(`${api}carts`, body, {
      headers: { Authorization: `${sessionStorage.getItem("token")}` },
    });
  };
  
// Function to remove a product from the user cart by its ID
export const removeFromUserCart = (productId: string): Promise<any> =>
  axios.delete(`${api}carts/${productId}`, {
    headers: { Authorization: `${sessionStorage.getItem("token")}` },
});