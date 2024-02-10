import React, { useState } from "react";
import "./Nasiya.css";
import axios from "../../../api";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Nasiya() {
  const [idNumber, setIdNumber] = useState("");
  const handleInputChange = (e) => {
    const value = e.target.value;
    const regexPattern = /^[a-zA-Z]{2}\d{7}$/;
    if (regexPattern.test(value)) {
      setIdNumber(value);
      console.log(value);
    }
  };

  function sendData(e) {
    e.preventDefault();
    let creditData = new FormData(e.target);
    let value = Object.fromEntries(creditData);
    value.phone = +value.phone;
    value.passport = idNumber;
    if (
      value.firstname === "" ||
      value.lastname === "" ||
      value.address === "" ||
      value.phone === "" ||
      value.passport === "" ||
      value.data === ""
    ) {
      return toast.warn("Inputlar ichini toldiring", {
        transition: Zoom,
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: true,
      });
    }
    axios
      .post("/creditUser/create", value)
      .then((res) => {
        console.log(res);
        if (res?.data?.innerData) {
          localStorage.setItem(
            "userCreditInfo",
            JSON.stringify(res?.data?.innerData)
          );
          toast.success(res?.data?.innerData.status, {
            autoClose: 1500,
            hideProgressBar: true,
          });
          // return setTimeout(() => window.location.reload(), 2500);
        }
      })
      .catch((res) => console.log(res));
    localStorage.setItem("userCreditInfo", JSON.stringify(creditData));
  }

  return (
    <div className="nasiya">
      <div className="container">
        <ToastContainer position="top-center" />
        <div className="nasiya_cart">
          <form onSubmit={sendData}>
            <h1>Nasiya savdo</h1>
            <div className="form_inputs">
              <input name="firstname" type="text" placeholder="Ismi" />
              <input name="lastname" type="text" placeholder="Familiyasi" />
              <input name="address" type="text" placeholder="Manzili" />
              <input name="phone" type="number" placeholder="Telefon raqami" />
              <input
                name="passport"
                type="text"
                placeholder="Passport raqami"
                onChange={(e) => handleInputChange(e)}
              />
              <input type="date" name="data" />
            </div>
            <button type="submit">Saqlash</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Nasiya;
