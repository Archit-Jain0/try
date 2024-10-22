import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/header/header.js";
import {
  BrowserRouter as Router,
  Route,
  Routes /*,Switch it has been removed in this version*/,
} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/footer/footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store.js";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct.js";
import UpdateProduct from "./component/admin/UpdateProduct.js";
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from "./component/admin/ProcessOrder.js";
import UsersList from "./component/admin/UsersList.js";
import UpdateUser from "./component/admin/UpdateUser.js";
import ProductReviews from "./component/admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About.js";
import NotFound from "./component/layout/Not Found/NotFound.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  /* async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }*/ //to remove error of 401
  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("An error of Stripe API key:", error);
    }
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null;

  window.addEventListener("contextmenu", (e) => e.preventDefault()); //by this line right click wont work

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />

        <Route path="/account" element={<ProtectedRoute element={Profile} />} />
        <Route
          path="/me/update"
          element={<ProtectedRoute element={UpdateProfile} />}
        />
        <Route
          path="/password/update"
          element={<ProtectedRoute element={UpdatePassword} />}
        />

        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/cart" element={<Cart />} />

        <Route
          path="/login/shipping"
          element={<ProtectedRoute element={Shipping} />}
        />
        <Route
          path="/order/confirm"
          element={<ProtectedRoute element={ConfirmOrder} />}
        />
        <Route
          path="/process/payment"
          element={
            <ProtectedRoute
              element={() => (
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              )}
            />
          }
        />
        <Route
          path="/success"
          element={<ProtectedRoute element={OrderSuccess} />}
        />
        <Route
          path="/order/me"
          element={<ProtectedRoute element={MyOrders} />}
        />
        <Route
          path="/order/:id"
          element={<ProtectedRoute element={OrderDetails} />}
        />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute isAdmin={true} element={Dashboard} />}
        />
        <Route
          path="/admin/products"
          element={<ProtectedRoute isAdmin={true} element={ProductList} />}
        />
        <Route
          path="/admin/product"
          element={<ProtectedRoute isAdmin={true} element={NewProduct} />}
        />
        <Route
          path="/admin/product/:id"
          element={<ProtectedRoute isAdmin={true} element={UpdateProduct} />}
        />
        <Route
          path="/admin/orders"
          element={<ProtectedRoute isAdmin={true} element={OrderList} />}
        />
        <Route
          path="/admin/order/:id"
          element={<ProtectedRoute isAdmin={true} element={ProcessOrder} />}
        />
        <Route
          path="/admin/users"
          element={<ProtectedRoute isAdmin={true} element={UsersList} />}
        />
        <Route
          path="/admin/user/:id"
          element={<ProtectedRoute isAdmin={true} element={UpdateUser} />}
        />
        <Route
          path="/admin/reviews"
          element={<ProtectedRoute isAdmin={true} element={ProductReviews} />}
        />

        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
//<ProtectedRoute exact path="/account" element={<Profile />} /> line 41 updated to nested routes
//{stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)}><Route exact path="/process/payment" element={<ProtectedRoute />}><Route exact path="/process/payment" element={<Payment />} /></Route></Elements>)} changed to above line 89
//for error of stripe key stripeApiKey changed to stripePromise in line 99...const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null; line added in line 56..in line 99 loadstripe removed from elements={loadstripe(stripApiKey)}
/* for new protected route this is the new way of writing routes
<Route exact path="/login/shipping" element={<ProtectedRoute />}>
          <Route exact path="/login/shipping" element={<Shipping />} />
        </Route>
        <Route exact path="/order/confirm" element={<ProtectedRoute />}>
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        </Route>
        <Route exact path="/process/payment" element={<ProtectedRoute />}>
          <Route
            exact
            path="/process/payment"
            element={
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            }
          />
        </Route>
        <Route exact path="/success" element={<ProtectedRoute />}>
          <Route exact path="/success" element={<OrderSuccess />} />
        </Route>
        <Route exact path="/order/me" element={<ProtectedRoute />}>
          <Route exact path="/order/me" element={<MyOrders />} />
        </Route>*/
