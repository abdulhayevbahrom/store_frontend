import React from "react";
import "./NasiyaCart.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

function NasiyaCart() {
  let location = useLocation();
  return (
    <div className="cridit_page">
      <div className="container">
        <Navbar />
        <div className="cridit_container">
          <div className="cridit_header_links">
            <ul>
              <li
                className={location.pathname === "/nasiya" ? "li_active" : ""}
              >
                <NavLink to="/nasiya">Nasiya qo'shish</NavLink>
              </li>
              <li
                className={
                  location.pathname === "/nasiya/allCridit" ? "li_active" : ""
                }
              >
                <NavLink to="/nasiya/allCridit">Nasiyadagi odamlar</NavLink>
              </li>
            </ul>
          </div>
          <div className="cridit_main_loyout">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NasiyaCart;
