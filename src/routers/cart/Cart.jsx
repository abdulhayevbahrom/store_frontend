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

function Cart() {
  const cart = useCart();
  const dispatch = useDispatch();

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
  }

  function decrementCart(id) {
    dispatch(DecrementCart({ id }));
  }

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

  let subtotal = cart.reduce((a, b) => a + b.totalPrice, 0);

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
        <div className="cartMain">
          <div className="cart_header">Sotiladigan mahsulotlar</div>
          <table className="cart_create_event">
            <thead className="cartMain_part_header">
              <tr className="cartMain_part_header1">
                <th>№</th>
                <th>nomi</th>
                <th>narx</th>
                <th>razmer</th>
                <th>rangi</th>
                <th>Nechta</th>
                <th>Umumiy narx</th>
                <th onClick={clearCart}>
                  <FaTrash />
                </th>
              </tr>
            </thead>
            <tbody className="cartMain_part">
              {cart?.map((i, inx) => (
                <tr key={inx} className="cartMain_part1">
                  <td>{inx + 1}</td>
                  <td>{i?.title}</td>
                  <td>{i?.price}</td>
                  <td>{i?.size}</td>
                  <td>{i?.color}</td>
                  <td className="cart__counter">
                    <button
                      disabled={i?.quantity == 1}
                      onClick={() => decrementCart(i?._id)}
                    >
                      <FaMinus />
                    </button>
                    <span>{i.quantity}</span>
                    <button onClick={() => incrementCart(i?._id)}>
                      <FaPlus />
                    </button>
                  </td>
                  <td>{i?.totalPrice}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(i?._id)}
                      className="delete_button"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1>{subtotal}</h1>
          <button onClick={checkout}>Yuborish</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
