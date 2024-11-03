import "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";

const TOKEN_KEY = "my-data";
export const API_URL = "http://192.168.100.247:3500/api/farmers";
// export const API_URL = 'https://capstone-server-kqsi.onrender.com';
const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    id: null,
    stars: null,
    authenticated: false,
    fullname: "",
    learning_disabilities: [],
    gender: "",
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    const loadToken = async () => {
      let storedData = await SecureStore.getItemAsync("my-data");
      await SecureStore.deleteItemAsync("my-data");
      if (storedData) {
        storedData = await JSON.parse(storedData);
      }

      if (storedData) {
        setAuth({
          authenticated: true,
          fullname: storedData?.fullname,
          gender: storedData?.gender,
          id: storedData?.id,
          learning_disabilities: storedData?.learning_disabilities,
          stars: storedData?.stars,
        });

        NetInfo.fetch().then((state) => {
          if (state.isConnected) {
            const updateOnline = async () => {
              await axios.post(`${API_URL}/game`, {
                id: storedData?.id,
                stars: storedData?.stars,
              });
            };
            updateOnline();
          }
        });
      }
    };

    loadToken();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth`, { email, password });
      console.log(response.data);
      setAuth({
        authenticated: true,
        fullname: "test",
        gender: "ewan",
        id: "1233456",
      });

      //   await SecureStore.setItemAsync("my-data", JSON.stringify(response.data));
    } catch (error) {
      return { error: true, msg: error?.response?.data?.message };
    }
  };

  const logout = async () => {
    // axios.defaults.headers.common['Authorization'] = '';
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setAuth({
      authenticated: false,
      id: null,
      fullname: "",
      gender: "",
      learning_disabilities: [],
      stars: null,
    });
  };

  const value = {
    authState: auth,
    setAuthState: setAuth,
    onLogin: login,
    onLogout: logout,
    lessons: data,
    setLessons: setData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
