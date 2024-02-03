import { Route, Routes } from "react-router";
import { Auth, Cart, Home, Login, Product } from "./routers";
import Layout from "./layout";
import NasiyaCart from "./routers/nasiya/NasiyaCart";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function Router() {
  return (
    <div className="router">
      <ToastContainer />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<Auth />}>
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/nasiya" element={<NasiyaCart />} />
            <Route path="/product" element={<Product />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default Router;
