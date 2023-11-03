import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import EditProudcts from "./components/EditProudct";
import EditProduct from "./components/EditProudct";

function App() {
    return (
        <div className="App">
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/products">
                        <Route index element = {<Products/>}/>
                        <Route path="add" element={<AddProduct/>}/>
                        <Route path="edit/:id" element={<EditProduct/>}/>
                        </Route>
                </Routes>
            </Router>
            
        </div>
    );
}

export default App;
