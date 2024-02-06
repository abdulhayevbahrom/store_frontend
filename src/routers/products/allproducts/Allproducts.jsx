import "./allProducts.css";
import { useState, useEffect, memo } from "react";
import axios from "../../../api";
import Loader from "../../../components/loader/Loader";
import { FaTrash, FaEdit, FaMinus } from "react-icons/fa";
import ProEdit from "../proEdit/ProEdit";
function Allproducts() {
  const [updateData, setUpdateData] = useState("");
  const [openProEdit, setOpenProEdit] = useState(false);
  let [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("/pro/allProducts")
      .then((res) => setData(res?.data?.innerData))
      .catch((err) => console.log(err));
  }, []);
  function deleteAll() {
    axios
      .delete("/pro/deleteAllData")
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }

  function deleteOne(id) {
    axios
      .delete(`/pro/delete/${id}`)
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  }

  function proEdit(id) {
    axios
      .put(`/pro/update/${id}`)
      .then((res) => {
        console.log(res);
        if (res?.data?.status) {
          setUpdateData(res?.data?.innerData);
          setOpenProEdit(true);
        }
      })
      .catch((err) => console.log(err));
  }

  openProEdit
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <div className="allproducts">
      {openProEdit && <ProEdit data={updateData} close={setOpenProEdit} />}

      <div className="container">
        <table className="fl-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nomi</th>
              <th>Asl narxi</th>
              <th>Sotiladigan narxi</th>
              <th>Soni</th>
              <th>Kategoriyasi</th>
              <th>Subkategoriyasi</th>
              <th>O'lchami</th>
              <th>Brendi</th>
              <th>rangi</th>
              <th>Tahrirlash</th>
              <th onClick={deleteAll}>
                <FaTrash />
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((i, inx) => (
              <tr key={inx}>
                <td>{inx + 1}</td>
                <td>{i?.title ? i?.title : <FaMinus />}</td>
                <td>{i?.orgPrice ? i?.orgPrice : "0"}</td>
                <td>{i?.price ? i?.price : "0"}</td>
                <td>{i?.quantity ? i?.quantity : "0"}</td>
                <td>{i?.category ? i?.category : <FaMinus />}</td>
                <td>{i?.subcategory ? i?.subcategory : <FaMinus />}</td>
                <td>{i?.size ? i?.size : "0"}</td>
                <td>{i?.brand ? i?.brand : <FaMinus />}</td>
                <td>{i?.color ? i?.color : <FaMinus />}</td>
                <td onClick={() => proEdit(i?._id)}>
                  <FaEdit />
                </td>
                <td onClick={() => deleteOne(i?._id)}>
                  <FaTrash />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(Allproducts);
