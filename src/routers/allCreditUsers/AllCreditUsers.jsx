import React, { useEffect, useState } from "react";
import "./AllCreditUsers.css";
import axios from "../../api";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

function AllCreditUsers() {
  let [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("/creditUser/creditUsers")
      .then((res) => setData(res.data.innerData))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="creditCart">
      {/* <div className="container"> */}
      <table className="credit_table">
        <caption>Barcha qarzdorlar</caption>
        <thead>
          <tr>
            <th>#</th>
            <th>Ismi</th>
            <th>Familiyasi</th>
            <th>Manzili</th>
            <th>Telefon raqami</th>
            <th>Passport raqami</th>
            <th>Sotib olgan mahsulotlari</th>
            <th>Umumiy summa</th>
            <th>Tahrirlash</th>
            <th>O'chirish</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((i, inx) => (
            <tr key={inx}>
              <td>{inx + 1}</td>
              <td>{i?.firstname}</td>
              <td>{i?.lastname}</td>
              <td>{i?.address}</td>
              <td>{i?.phone}</td>
              <td>{i?.passport}</td>
              <td></td>
              <td></td>
              <td>
                <FaPencilAlt />
              </td>
              <td>
                <FaTrashCan />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    // </div>
  );
}

export default AllCreditUsers;
