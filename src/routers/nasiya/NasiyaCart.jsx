import React from "react";
import Nasiya from "./nasiya_create/Nasiya";
import AllCreditUsers from "../../components/allCreditUsers/AllCreditUsers";
import "./NasiyaCart.css";

function NasiyaCart() {
  return (
    <div className="cridit_page">
      <Nasiya />
      <AllCreditUsers />
    </div>
  );
}

export default NasiyaCart;
