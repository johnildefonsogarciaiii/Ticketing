import * as UserAPI from "../api/userAPI";
import { useCookies } from "react-cookie";

export default function AuthService() {
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);

  const login = async (email, password) => {
    try {
      const res = await UserAPI.login(email, password);
      const { token } = res.data;
      setCookie("auth", token, { patch: "/" });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const logout = () => {
    removeCookie("auth", { path: "/" });
  };

  const isAuthenticated = () => {
    return !!cookies.auth;
  };

  return {
    login,
    logout,
    isAuthenticated,
  };
}
