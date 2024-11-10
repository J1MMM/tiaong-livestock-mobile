import axios from "../api/axios";
import useAuth from "./useAuth";
import * as SecureStore from "expo-secure-store";

const UseRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const refreshToken = await SecureStore.getItemAsync("refreshToken");
      console.log(JSON.parse(refreshToken));

      const response = await axios.get(
        `/refresh?refreshToken=${JSON.parse(refreshToken)}`
      );
      console.log(response.data);
      setAuth((prev) => ({
        ...prev,
        accessToken: response.data?.accessToken,
        authenticated: true,
        isApprove: response.data?.isApprove,
      }));

      return response.data.accessToken;
    } catch (error) {
      console.log(error);
    }
  };

  return refresh; // Return the function itself
};

export default UseRefreshToken;