import useAuthenStore from "@/midlewares/authenStore";
import { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
const useCheckAuthen = () => {
  const { setAuthen } = useAuthenStore();
  const checkTokenExpiration = async (token: string) => {
    try {
      if (!token) {
        return false;
      }
      const decodedToken = jwtDecode<JwtPayload>(token);
      if (!decodedToken || typeof decodedToken.exp !== "number") {
        console.error("Token không hợp lệ hoặc không có thời hạn hiệu lực");
        return false;
      }

      const tokenExpirationTime = decodedToken.exp * 1000;
      if (token && tokenExpirationTime < Date.now()) {
        setAuthen(false);
        return false;
      }
      setAuthen(true);
      return true;
    } catch (error) {
      console.error("Lỗi khi kiểm tra thời hạn hiệu lực của token:", error);
    }
  };

  return { checkTokenExpiration };
};

export default useCheckAuthen;
