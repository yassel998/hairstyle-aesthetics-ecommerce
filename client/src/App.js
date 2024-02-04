import "./app.scss";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Product from "./pages/product/Product";
import Faq from "./pages/faq/Faq";
import Contact from "./pages/contact/Contact";
import ScrollToTop from "./ScrollToTop";
import SearchBoxMobile from "./components/search/SearchBoxMobile";
import PaymentSuccess from "./pages/paymentSuccess/PaymentSuccess";

const Layout = () => {
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />
      {isMobile && <SearchBoxMobile />}
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
