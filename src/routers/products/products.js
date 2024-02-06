import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./Product.css";

function products() {
  return (
    <div className="products">
      <div className="container">
        <Navbar />
        <div className="products_container">
          <div className="product_header_links">
            <ul>
              <li>
                <NavLink to="/product">Mahsulot qo'shish</NavLink>
              </li>
              <li>
                <NavLink to="/product/allProduct">Barcha mahsulotlar</NavLink>
              </li>
            </ul>
          </div>
          <div className="product_outlet_container">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default products;
