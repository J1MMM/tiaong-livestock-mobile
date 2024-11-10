import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Splash from "./SplashScreen";
import UseRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  // get access token
  const refresh = UseRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return isLoading ? <Splash /> : children;
  //   return children;
};

export default PersistLogin;
