import "./Cart.css";
import { useCart } from "../../redux/selectors";
import {
  ClearCart,
  RemoveFromCart,
  IncrementCart,
  DecrementCart,
} from "../../redux/cart";
import { useDispatch } from "react-redux";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import axios from "../../api";
import { toast } from "react-toastify";
import emptyCart from "../../assets/emptyCart.png";
import { useState } from "react";
import CriditRegister from "../../components/criditRegister/CriditRegister";

function Cart() {
  const cart = useCart();
  const dispatch = useDispatch();
  const [openRgister, setOpenRgister] = useState(false);

  // delete item
  function handleDelete(id) {
    let warning = window.confirm("Savatni bo'shatishni xohlaysizmi?");
    if (warning) {
      dispatch(RemoveFromCart(id));
      toast.success("Mahsulot o'chirildi", {
        position: "top-center",
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
  }

  // CART INCREMENT => FUNCTION

  function incrementCart(id) {
    dispatch(IncrementCart({ id }));
  }

  // CART DECREMENT => FUNCTION

  function decrementCart(id) {
    dispatch(DecrementCart({ id }));
  }

  // CART CLEAR => FUNCTION

  function clearCart() {
    let warning = window.confirm("Savatni bo'shatishni xohlaysizmi?");
    if (warning) {
      dispatch(ClearCart());
      toast.success("Savat o'bo'shatildi", {
        position: "top-center",
        hideProgressBar: true,
        autoClose: 2000,
      });
    }
  }

  let subtotal = cart?.reduce((a, b) => a + b.totalPrice, 0);

  function checkout() {
    axios
      .patch("/pro/updateQty", cart)
      .then((res) => {
        console.log(res);
        if (res.data?.innerData?.status === "success") {
          // return dispatch(ClearCart());
          toast.success("Savat bo'shatildi");
        }
      })
      .catch((err) => console.log(err));
  }

  // cridit register function

  const register = () => {
    setOpenRgister(true);
  };

  openRgister
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  return (
    <div className="main_cart_home">
      {openRgister && <CriditRegister close={setOpenRgister} />}
      <div className="container">
        {cart?.length ? (
          <div className="cart_table_container">
            <table>
              <caption className="table_caption">Sotiladigan tavarlar</caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nomi</th>
                  <th>Narxi</th>
                  <th>Razmeri</th>
                  <th>Rangi</th>
                  <th>Umumiy narxi</th>
                  <th>Bazadagi soni</th>
                  <th>Sotiladigan soni</th>
                  <th>O'chirish</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((item, inx) => (
                  <tr key={inx}>
                    <td>{inx + 1}</td>
                    <td>{item?.title ? item?.title : <FaMinus />}</td>
                    <td>{item?.price ? item?.price + " ming" : 0}</td>
                    <td>{item?.size ? item?.size : <FaMinus />}</td>
                    <td>{item?.color ? item?.color : <FaMinus />}</td>
                    <td>{cart?.totalPrice + " so'm"}</td>
                    <td>{item?.quantity ? item?.quantity + " ta" : 0}</td>
                    <td>
                      <div className="table_butons">
                        <button
                          disabled={item?.quantity == 1}
                          onClick={() => decrementCart(item?._id)}
                        >
                          <FaMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => incrementCart(item?._id)}>
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div
                        onClick={() => handleDelete(item?._id)}
                        className="table_trash"
                      >
                        <FaTrash />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart_tfoot">
              <div className="cart_tfoot_title">
                <h2>Sotib olingan mahulotlar</h2>
              </div>
              <div className="cart_tfoot_totall">
                <ul>
                  <li>
                    <span>Jami:</span>
                    <h2>
                      {cart?.length} <span>mahsulot sotib olindi</span>
                    </h2>
                  </li>
                  <li>
                    <span>Umumiy narxi:</span>
                    <h2>
                      {subtotal} <span> so'm</span>
                    </h2>
                  </li>
                </ul>
              </div>
              <div className="cart_tfoot_btn">
                <button>Naxtga sotib olish</button>
                <button onClick={register}>Nasiyaga sotib olish</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="cart_empty_img_container">
            <img src={emptyCart} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
