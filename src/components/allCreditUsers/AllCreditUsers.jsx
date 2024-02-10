import React, { useEffect, useState } from "react";
import "./AllCreditUsers.css";
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
// CREDIT API =>
import {
  useCriditFintUserMutation,
  useCreditUserDeleteOneMutation,
  useGetAllCriditDataQuery,
} from "../../redux/criditApi";
import { toast, ToastContainer, Zoom } from "react-toastify";
import emptyData from "../../assets/notFoundImg.jpeg";

function AllCreditUsers() {
  const { data, isLoading } = useGetAllCriditDataQuery();
  const [findCriditUset] = useCriditFintUserMutation();
  const [creditUserDeleteOne] = useCreditUserDeleteOneMutation();

  let [dataItem, setDataItem] = useState([]);

  const criditUserDeleteOne = async (id) => {
    let clientConfirm = window.confirm("Malumotni o'chirishga rozimisiz");

    clientConfirm &&
      (await creditUserDeleteOne(id)
        .then((res) => {
          if (res?.data?.status) {
            toast.success("malumor o'chirildi", {
              transition: Zoom,
              autoClose: 2000,
              closeButton: false,
              hideProgressBar: true,
            });
          }
        })
        .catch((err) => console.log(err)));
  };

  useEffect(() => {
    if (data?.status === "success") {
      setDataItem(data?.innerData);
    }
  }, [data]);

  const clickEye = async (id) => {
    await findCriditUset({ id })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  let addData = new Date().toLocaleString();
  let split = addData.split(" ");

  return (
    <div className="creditCart">
      {isLoading ? (
        <div className="cridit_empty_img">
          <img src={emptyData} alt="" />
        </div>
      ) : (
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
                {dataItem?.map((i, inx) => (
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
                      <FaRegEye onClick={() => clickEye(i?._id)} />
                    </td>
                    <td>
                      <FaPencilAlt />
                    </td>
                    <td>
                      <FaTrashCan onClick={() => criditUserDeleteOne(i?._id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllCreditUsers;
