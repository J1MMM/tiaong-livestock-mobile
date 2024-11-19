import { USER_INITIAL_DATA } from "../utils/constant";
import useAuth from "./useAuth";
import useData from "./useData";
import * as SecureStore from "expo-secure-store";

const UseLogout = () => {
  const { setAuth } = useAuth();
  const { setUserData } = useData();
  // const { setFranchises, setArchivedFranchises, setAvailableMTOP } = useData();

  const logout = async () => {
    setAuth((prev) => ({ authenticated: false }));
    setUserData(USER_INITIAL_DATA);
    await SecureStore.deleteItemAsync("refreshToken");
  };

  return logout;
};

export default UseLogout;
