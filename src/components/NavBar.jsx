import "./navbar.css";
import { Link } from "react-router-dom";

export function NavBar({ cartItemCount }) {
  return (
    <nav className="navbar navbar-expand-lg bg-dark fixed-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand ms-3 fw-bold fs-3 text-white">
          Platzi Store
        </Link>
        <button
          className="navbar-toggler bg-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="justify-content-evenly fs-6 collapse navbar-collapse"
          id="navbarCollapse"
        >
          <ul className="navbar-nav ms-3 fw-bold">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link text-white">
                Store
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link text-white">
                Cart{" "}
                {cartItemCount > 0 && (
                  <span className="badge bg-danger rounded-pill ms-1">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
