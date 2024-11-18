import axios from "../api/axios";
import useAuth from "./useAuth";
import * as SecureStore from "expo-secure-store";

const UseRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      // await SecureStore.deleteItemAsync("refreshToken");
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      if (!refreshToken) return;

      const response = await axios.get(
        `/refresh?refreshToken=${JSON.parse(refreshToken)}`
      );
      console.log(response.data);
      setAuth((prev) => ({
        ...prev,
        accessToken: response.data?.accessToken,
        isApprove: response.data?.isApprove,
        authenticated: true,
        id: response.data?.id,
      }));

      return response.data.accessToken;
    } catch (error) {
      console.log(error);
    }
  };

  return refresh; // Return the function itself
};

export default UseRefreshToken;
