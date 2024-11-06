import { Button } from "bootstrap";
import { Link } from "react-router-dom";
import "./HomePage.css";
import NavBar from "./NavBar";

export function HomePage() {
  return (
    <div className="container-fluid mt-2">
      <div className="row">
        <div className="col-md-12">
          <NavBar />

          <div className="expore-page">
            <div className="mt-5 pt-3 text-center">
              <p className="fs-5 mt-3 mb-4 mt-3 text-img">
                Your Destination for Quality Finds
              </p>
              <div className="fs-1 fw-bold text-img">Trending Shop</div>
              <p className="fs-3 mt-4 p-3 text-img">
                Welcome to Trending Shop, where every product tells a story.{" "}
                <br /> From handpicked items to the latest trends!
              </p>
              <div
                className="btn btn-outline-light p-3 text-dark fw-bold fs-5 mt-3"
                type="button"
              >
                <Link to="products" className="text-decoration-none">
                  EXPLORE OUR PRODUCTS
                </Link>
              </div>
            </div>
            <hr />
          </div>
          <div className="col-md-12 text-center fs-6 mt-3">
            <div className="justify-content-center design-developed fw-bold text-dark">
              Data Provided By{" "}
              <a
                className="link-platzi"
                href="https://api.escuelajs.co/api/v1/products"
              >
                PLATZI FAKE STORE API
              </a>
              <div className=" mt-3 fw-bold fs-5 mb-2">
                <span className="bi bi-c-circle-fill"></span> 2024 - Shailesh
                Gaikwad
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
