import { Product } from "./product";


export interface Cart {
   _id?: string;
    userId: string;
    products: Product[];
    active: boolean;
    
}
