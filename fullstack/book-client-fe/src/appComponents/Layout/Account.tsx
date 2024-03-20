import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormLogin from "../element/FormLogin";
import FormRegister from "../element/FormRegister";
import useAuthenStore from "@/midlewares/authenStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
const Account = () => {
  const { authen, setAuthen } = useAuthenStore();
  const handleLogout = async () => {
    localStorage.removeItem("token");
    setAuthen(false);
  };
  return (
    <>
      {authen ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-gray-500 font-medium text-sm px-2 py-[10px]">
            Tài Khoản
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white flex flex-col p-0 ">
            <DropdownMenuLabel className="m-0">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link to={""} className="hover:bg-gray-500 px-2 py-1">
              Profile
            </Link>
            <Link to={""} className="hover:bg-gray-500 px-2 py-1">
              Billing
            </Link>
            <Link to={""} className="hover:bg-gray-500 px-2 py-1">
              Team
            </Link>
            <Link to={""} className="hover:bg-gray-500 px-2 py-1">
              Subscription
            </Link>
            <Link
              onClick={handleLogout}
              to={""}
              className="hover:bg-gray-500 px-2 py-1 flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Đăng Xuất
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Dialog>
          <DialogTrigger className="hover:bg-gray-500  font-medium text-sm px-2 py-[10px]">
            {" "}
            Tài Khoản
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]  bg-white">
            <Tabs defaultValue="account" className="w-[550px] ">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Đăng Nhập</TabsTrigger>
                <TabsTrigger value="password">Đăng Ký</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <FormLogin />
              </TabsContent>
              <TabsContent value="password">
                <FormRegister />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Account;
