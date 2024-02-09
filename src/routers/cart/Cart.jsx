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

function Cart() {
  const cart = useCart();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

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

  function incrementCart(id) {
    dispatch(IncrementCart({ id }));

    if (count <= 0) {
      return setCount(0);
    }
    setCount(count - 1);
  }

  function decrementCart(id) {
    dispatch(DecrementCart({ id }));

    setCount(count + 1);
  }
  console.log(cart);

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

  let totalPrice = cart.reduce((a, b) => a + b.price * count, 0);

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

  return (
    <div className="main_cart_home">
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
                    <td>{totalPrice + " so'm"}</td>
                    <td>{item?.quantity ? item?.quantity + " ta" : 0}</td>
                    <td>
                      <div className="table_butons">
                        <button
                          disabled={count <= 0 ? true : false}
                          onClick={() => incrementCart(item?._id)}
                        >
                          <FaMinus />
                        </button>
                        <span>{item?.price * count}</span>
                        <button onClick={() => decrementCart(item?._id)}>
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
                      {totalPrice} <span> so'm</span>
                    </h2>
                  </li>
                </ul>
              </div>
              <div className="cart_tfoot_btn">
                <button>Naxtga sotib olish</button>
                <button>Nasiyaga sotib olish</button>
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
