import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="bg-gray-100 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
