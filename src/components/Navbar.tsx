import { FunctionComponent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";



interface NavbarProps {
    
}
 
const Navbar: FunctionComponent<NavbarProps> = () => {
  const navigate = useNavigate()
  const handlelogout=()=>{
sessionStorage.removeItem("token")
navigate("/")
  }
    return (
       <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="/Home">Techit</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
          <NavLink className="nav-link" to="/Products">Products</NavLink>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Cart</a>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">Profile</NavLink>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul className="dropdown-menu">
          
              <li>
            <NavLink className="nav-link" to="/profile">Profile</NavLink>
          </li>
          <li><hr className="dropdown-divider"/></li>
              <li><a className="dropdown-item" onClick={handlelogout}>logout</a></li>
            </ul>
          </li>

        </ul>
        <form className="d-flex" role="search">
          <input className="form-control me-2 center" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success me-4" type="submit">Search</button>
        </form>

       
          <button className="btn btn-outline-primary" type="submit" onClick={handlelogout}>logout</button>
        
      </div>
    </div>
  </nav></> );
}
 
export default Navbar;