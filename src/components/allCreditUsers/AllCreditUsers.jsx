import React, { useEffect, useState } from "react";
import "./AllCreditUsers.css";
import axios from "../../api/index";
import {
  FaPencilAlt,
  FaRegCalendarPlus,
  FaRegCalendarCheck,
  FaRegEye,
} from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import { FaTrashCan } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import { IoTrashBinOutline } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";

function AllCreditUsers() {
  let [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("/creditUser/creditUsers")
      .then((res) => setData(res.data.innerData))
      .catch((err) => console.log(err));
  }, [data]);

  let addData = new Date().toLocaleString();
  let split = addData.split(" ");

  return (
    <div className="creditCart">
      <div className="container">
        <div className="table_container">
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
                <th>
                  <GiMoneyStack />
                </th>
                <th>
                  <FaRegCalendarPlus />
                </th>
                <th>
                  <FaRegCalendarCheck />
                </th>
                <th>
                  <BsCart2 />
                </th>
                <th>
                  <LuClipboardEdit />
                </th>
                <th>
                  <IoTrashBinOutline />
                </th>
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
                  <td>{split[0]}</td>
                  <td>{split[0]}</td>
                  <td>
                    <FaRegEye />
                  </td>
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
      </div>
    </div>
  );
}

export default AllCreditUsers;
