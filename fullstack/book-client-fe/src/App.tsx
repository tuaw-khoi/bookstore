import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./appComponents/Layout/Layout";
import HomePage from "./appComponents/Page/HomePage";
import InformationStore from "./appComponents/Page/InformationStore";
import RegularQuestion from "./appComponents/Page/RegularQuestion";
import TakeCareCustomer from "./appComponents/Page/TakeCareCustomer";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Thay thế Layout component của bạn
    children: [
      {
        index: true,
        element: <HomePage />, // Trang chủ
      },
      {
        path: "thongtin",
        element: <InformationStore />, // Danh sách sách
        // loader: () => {
        //   // Logic to fetch all books
        // },
      },
      {
        path: "cau-hoi-thuong-gap",
        element: <RegularQuestion />, // Danh sách sách
        // loader: () => {
        //   // Logic to fetch all books
        // },
      },
      {
        path: "cham-soc-khach-hang",
        element: <TakeCareCustomer />, // Danh sách sách
        // loader: () => {
        //   // Logic to fetch all books
        // },
      },
    ],
    // {
    //   path: "books/:bookId",
    //   element: <BookDetailsPage />, // Chi tiết sách
    //   loader: ({ params }) => {
    //     // Logic to fetch book details by ID
    //   },
    // },
    // {
    //   path: "cart",
    //   element: <CartPage />, // Giỏ hàng
    //   loader: () => {
    //     // Logic to fetch cart items
    //   },
    // },
    // {
    //   path: "checkout",
    //   element: <CheckoutPage />, // Thanh toán
    //   loader: () => {
    //     // Logic to fetch checkout details
    //   },
    // },
    // {
    //   path: "login",
    //   element: <LoginPage />, // Đăng nhập
    //   action: loginAction,
    //   loader: loginLoader,
    // },
    // {
    //   path: "profile",
    //   element: <ProfilePage />, // Hồ sơ
    //   loader: () => {
    //     // Logic to fetch user profile
    //   },
    // },
  },
]);
function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

export default App;
