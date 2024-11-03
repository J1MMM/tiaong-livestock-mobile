import "react-native-gesture-handler";
import Layout from "./app/screens/Layout";
import { AuthProvider } from "./app/context/AuthProvider";

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}
