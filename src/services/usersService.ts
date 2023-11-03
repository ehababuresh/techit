import axios  from "axios";
import { User } from "../interfaces/User";
import { jwtDecode } from "jwt-decode";




const api : string = process.env.REACT_APP_API || "";

//add new user

export const addUser = (newUser: User): Promise<any> => axios.post(`${api}register`, newUser);


// login user
export const checkUser = (user: User): Promise<any> => axios.post(`${api}login`, user);
 

// get user details
export const getUser = (): Promise<any> => 
    axios.get(`${api}profile`, {
        headers: { Authorization: `${sessionStorage.getItem("token")}` },
    });

// get payload from token

export const getIsAdmin = () => {
    return (jwtDecode(sessionStorage.getItem("token") as string) as any).isAdmin;
};

