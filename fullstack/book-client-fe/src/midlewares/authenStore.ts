import { create } from "zustand";

export type AuthenType = true | false | null;
export type authenticationType = "register" | "login" | null;

type AuthenModalType = {
  authen: AuthenType;
};
type loginModalType = {
  logins: AuthenType;
};
type authenticationModalType = {
  authentication: authenticationType;
};
type AuthenActionType = {
  setAuthen: (authentication: AuthenType) => void;
};
type logoutActionType = {
  logout: (authentication: AuthenType) => void;
};
type loginActionType = {
  setLogin: (authentication: AuthenType) => void;
};
type authenticationActionType = {
  setAuthentication: (authentication: authenticationType) => void;
};
const useAuthenStore = create<
  AuthenModalType &
    AuthenActionType &
    logoutActionType &
    loginActionType &
    loginModalType &
    authenticationModalType &
    authenticationActionType
>((set) => ({
  authen: null,
  logins: null,
  authentication: null,
  setAuthen: (authentication: AuthenType) => {
    set({ authen: authentication });
  },
  logout: (authentication: AuthenType) => {
    localStorage.removeItem("token");
    set({ authen: authentication });
  },
  setLogin: (authentication: AuthenType) => {
    set({ logins: authentication });
  },
  setAuthentication: (authentication: authenticationType) => {
    set({ authentication: authentication });
  },
}));

export default useAuthenStore;
