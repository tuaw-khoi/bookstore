import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import Bar from "./Bar";
import Account from "./Account";
import { useEffect, useRef } from "react";
import useCheckAuthen from "@/midlewares/checkAuthen";
import useAuthenStore from "@/midlewares/authenStore";
const Header = () => {
  const { checkTokenExpiration } = useCheckAuthen();
  const { authentication, setAuthentication } = useAuthenStore();
  const token = localStorage.getItem("token");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    const handleAuthentication = async () => {
      try {
        if (!token) return;
        await checkTokenExpiration(token);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };
    handleAuthentication();
    intervalRef.current = setInterval(() => {
      handleAuthentication();
    }, 3600000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current as any);
    };
  }, [token]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAuthentication(null);
    }, 3000);
    return () => clearTimeout(timer);
  }, [authentication]);
  return (
    <div className="bg-gray-400 pt-2 ">
      <div className=" border-0  container ">
        <div className="flex items-center flex-col justify-center ">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-5">
              <img src="src\assest\img\Standard Collection 11.png" alt="Logo" />
              <img
                className="h-7"
                src="src\assest\img\KeazoNBOOKS.png"
                alt="Logo"
              />
              <form className="flex rounded-xl items-center space-x-2 relative bg-white ">
                <Input
                  className="rounded-xl pr-72"
                  type="text"
                  placeholder="Tìm Sách"
                />
                <Link
                  to={"hello"}
                  className="p-2 rounded-e-xl absolute right-0 hover:bg-slate-700"
                  type="submit"
                >
                  Tìm Kiếm
                </Link>
              </form>
            </div>
            <div className="flex  gap-8 ">
              <div className="flex items-center">
                <Link
                  to={""}
                  className="hover:bg-gray-500 py-[10px] px-2 font-medium text-sm"
                  type="submit"
                >
                  Trang Chủ
                </Link>
                <Account />
              </div>
              <img
                className="h-[36px]"
                src="src\assest\img\icons8-shopping-cart-32.png"
                alt="Logo"
              />
            </div>
          </div>
          <Menubar className=" border-0 container p-0 ">
            <div className="flex space-x-16 w-full h-full justify-center mb-0">
              <MenubarMenu>
                {/* <MenubarTrigger className="cursor-pointer hover:bg-gray-500"> */}
                <Bar />
                {/* </MenubarTrigger> */}
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer hover:bg-gray-500">
                  Thông Tin
                </MenubarTrigger>
                <MenubarContent className="cursor-pointer p-0 bg-white flex flex-col">
                  <Link
                    to={"thongtin"}
                    className="cursor-pointer hover:bg-gray-500 p-1"
                  >
                    Giới Thiệu Về KeazoNBooks
                  </Link>
                  <Link
                    to={"cau-hoi-thuong-gap"}
                    className="cursor-pointer hover:bg-gray-500 p-1"
                  >
                    Câu Hỏi Thường Gặp
                  </Link>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer hover:bg-gray-500">
                  Trợ Giúp
                </MenubarTrigger>
                <MenubarContent className="cursor-pointer p-0 bg-white flex flex-col">
                  <Link
                    to={"cham-soc-khach-hang"}
                    className="cursor-pointer hover:bg-gray-500 p-1"
                  >
                    Chăm Sóc Khách Hàng
                  </Link>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer hover:bg-gray-500 ">
                  Khuyến Mãi
                </MenubarTrigger>
                <MenubarContent className="cursor-pointer p-0 bg-white flex flex-col">
                  <Link
                    to={""}
                    className="cursor-pointer hover:bg-gray-500 p-1"
                  >
                    New Tab
                  </Link>
                  <Link
                    to={""}
                    className="cursor-pointer hover:bg-gray-500 p-1"
                  >
                    New Window
                  </Link>
                  <Link
                    to={""}
                    className="cursor-pointer hover:bg-gray-500 p-1"
                  >
                    Share
                  </Link>
                  <Link
                    to={""}
                    className="cursor-pointer hover:bg-gray-500 p-1"
                  >
                    Print
                  </Link>
                </MenubarContent>
              </MenubarMenu>
            </div>
          </Menubar>
          {authentication === "login" ? (
            <Alert className="absolute top-[30%] left-[35%] z-30 bg-white w-[500px] rounded-xl">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                You can add components to your app using the cli.
              </AlertDescription>
            </Alert>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Header;
