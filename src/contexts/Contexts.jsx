import { createContext } from "react";

export const AppContext = createContext({
  userName: "",
  isLoggedIn: false,
  theme: "",
  setAppContext: () => {},
});