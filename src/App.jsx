import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout.jsx";
import HomePage from "./features/home/HomePage.jsx";
import LoginPage from "./features/users/LoginPage.jsx";
import RegisterPage from "./features/users/RegisterPage.jsx";
import AdminPanel from "./features/admin/AdminPanel.jsx";
import AddProduct from "./features/admin/AddProduct.jsx";
import UpdateProduct from "./features/admin/UpdateProduct.jsx";
import NotFound from "./components/NotFound.jsx";
import Product from "./features/products/Product.jsx";
import Carts from "./features/carts/Carts.jsx";
import UserProfile from "./features/users/UserProfile.jsx";
import ProfileMainPage from "./features/users/ProfileMainPage.jsx";
import OrderDetail from "./features/orders/OrderDetail.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },

        { path: "/admin-panel", element: <AdminPanel /> },
        { path: "/admin/add-product", element: <AddProduct /> },
        { path: "/admin/edit-product/:id", element: <UpdateProduct /> },

        { path: "/product/:id", element: <Product /> },
        { path: "/carts", element: <Carts /> },
        { path: "/user/profile", element: <ProfileMainPage /> },

        { path: "/user/orders/:id", element: <OrderDetail /> },

        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
