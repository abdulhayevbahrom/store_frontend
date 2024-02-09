import { Route, Routes } from "react-router";
import { Auth, Cart, Home, Login } from "./routers";
import Product from "./routers/Product";
import Layout from "./layout";
import NasiyaCart from "./routers/nasiya/NasiyaCart";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ProductController } from "./controller/ProductController";
import Allproducts from "./routers/products/allproducts/Allproducts";
import CreateProduct from "./routers/products/createProduct/CreateProduct";
import AllCreditUsers from "./components/allCreditUsers/AllCreditUsers";
import Nasiya from "./routers/nasiya/nasiya_create/Nasiya";

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
        <Route element={<ProductController />}>
          <Route path="/product" element={<Product />}>
            <Route path="/product" element={<CreateProduct />} />
            <Route path="/product/allProduct" element={<Allproducts />} />
          </Route>
        </Route>
        <Route element={<ProductController />}>
          <Route path="/nasiya" element={<NasiyaCart />}>
            <Route path="/nasiya" element={<Nasiya />} />
            <Route path="/nasiya/allCridit" element={<AllCreditUsers />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default Router;
