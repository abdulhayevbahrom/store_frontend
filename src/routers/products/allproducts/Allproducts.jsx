import "./allProducts.css";
import { useState, useEffect, memo } from "react";
import axios from "../../../api";
import { FaTrash, FaEdit, FaMinus } from "react-icons/fa";
import ProEdit from "../proEdit/ProEdit";
import {
  useGetAllProductsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useSearchPostMutation,
  useDeleteAllProductsMutation,
} from "../../../redux/productApi";
import { toast, ToastContainer } from "react-toastify";

import emptyData from "../../../assets/notFoundImg.jpeg";

function Allproducts() {
  const { data, error } = useGetAllProductsQuery();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const [searchPost] = useSearchPostMutation();
  const [deleteAllProducts] = useDeleteAllProductsMutation();

  const [updateData, setUpdateData] = useState("");
  const [openProEdit, setOpenProEdit] = useState(false);
  let [dataItem, setDataItem] = useState(null);

  useEffect(() => {
    if (!error) setDataItem(data?.innerData);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Malumot toqilmadi");
    }
  }, []);

  async function deleteAll() {
    let clientConfirm = window.confirm("Malumotni o'chirishga rozimisiz");

    clientConfirm &&
      (await deleteAllProducts()
        .then((res) => setDataItem(res))
        .catch((err) => console.log(err)));
  }

  async function deleteOne(id) {
    let clientConfirm = window.confirm("Malumotni o'chirishga rozimisiz");

    clientConfirm &&
      (await deletePost(id)
        .then((res) => {
          if (res?.data?.msg === "product is deleted") {
            isLoading &&
              toast.success("Malumot muofaqiyatli o'chirildi", {
                autoClose: 1500,
                closeButton: false,
                hideProgressBar: true,
              });
            setDataItem(res);
          }
        })
        .catch((err) => console.log(err)));
  }

  async function proEdit(data) {
    await updatePost(data)
      .then((res) => {
        if (res?.data?.status) {
          setUpdateData(res?.data?.innerData);
          setOpenProEdit(true);
        }
      })
      .catch((err) => console.log(err));
  }

  async function SearchValue(e) {
    let value = e.trimStart();

    await searchPost({ value })
      .then((res) => {
        if (res?.data?.status === "success") {
          setDataItem(res?.data?.innerData);
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
        <ToastContainer />
        {error ? (
          <div className="img_container">
            <img src={emptyData} alt="" />
          </div>
        ) : (
          <table className="fl-table">
            <caption>
              <input
                type="text"
                placeholder="Malumotlarni qidirish"
                onChange={(e) => SearchValue(e.target.value)}
              />
            </caption>
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
              {dataItem?.map((i, inx) => (
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
                  <td onClick={() => proEdit(i)}>
                    <FaEdit />
                  </td>
                  <td onClick={() => deleteOne(i?._id)}>
                    <FaTrash />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default memo(Allproducts);
