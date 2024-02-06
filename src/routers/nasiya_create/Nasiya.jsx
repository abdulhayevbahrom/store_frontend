import React from "react";
import "./Nasiya.css";
import axios from "../../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Nasiya() {
  function sendData(e) {
    e.preventDefault();
    let creditData = new FormData(e.target);
    let value = Object.fromEntries(creditData);

    axios
      .post("/creditUser/create", value)
      .then((res) => {
        localStorage.setItem(
          "userCreditInfo",
          JSON.stringify(res.data.innerData)
        );
        toast.success("successfuly saved", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: true,
        });
        setTimeout(() => window.location.reload(), 2500);
      })
      .catch((res) => console.log(res));
    localStorage.setItem("userCreditInfo", JSON.stringify(creditData));
  }
  return (
    <div className="nasiya">
      <div className="container">
        <ToastContainer />
        <div className="nasiya_cart">
          <form onSubmit={sendData}>
            <h1>Nasiya savdo</h1>
            <div className="hrr"></div>
            <input name="firstname" type="text" placeholder="Ismi" />
            <input name="lastname" type="text" placeholder="Familiyasi" />
            <input name="address" type="text" placeholder="Manzili" />
            <input name="phone" type="text" placeholder="Telefon raqami" />
            <input name="passport" type="text" placeholder="Passport raqami" />
            <button type="submit">Saqlash</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Nasiya;
