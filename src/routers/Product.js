import React from "react";
import "./products/Product.css";
import Navbar from "../components/navbar/Navbar";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const Product = () => {
  let location = useLocation();

  return (
    <div className="products">
      <div className="container">
        <Navbar />
        <div className="products_container">
          <div className="product_header_links">
            <ul>
              <li
                className={location.pathname === "/product" ? "li_active" : ""}
              >
                <NavLink to="/product">Mahsulot qo'shish</NavLink>
              </li>
              <li
                className={
                  location.pathname === "/product/allProduct" ? "li_active" : ""
                }
              >
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
};

export default Product;
