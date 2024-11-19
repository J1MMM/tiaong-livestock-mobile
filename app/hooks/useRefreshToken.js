import axios from "../api/axios";
import useAuth from "./useAuth";
import * as SecureStore from "expo-secure-store";
import useData from "./useData";

const UseRefreshToken = () => {
  const { setAuth } = useAuth();
  const { setUserData } = useData();

  const refresh = async () => {
    try {
      // await SecureStore.deleteItemAsync("refreshToken");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      if (!refreshToken) return;

      const response = await axios.get(
        `/refresh?refreshToken=${JSON.parse(refreshToken)}`
      );

      setAuth((prev) => ({
        ...prev,
        id: response.data?.id,
        accessToken: response.data?.accessToken,
        isApprove: response.data?.isApprove,
        authenticated: true,
      }));

      setUserData(response.data);

      return response.data.accessToken;
    } catch (error) {
      console.log(error);
    }
  };

  return refresh; // Return the function itself
};

export default UseRefreshToken;
