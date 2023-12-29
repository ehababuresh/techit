import { FunctionComponent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import './Navbar.css'; // Ensure this CSS file is included in your project

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Implement your search logic here
    console.log('Search functionality to be implemented');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom">
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
                <NavLink className="nav-link" to="/cart">Cart</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">Profile</NavLink>
              </li>
              {/* ... (other nav items) */}
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSearch}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <button className="btn btn-outline-primary" type="button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
