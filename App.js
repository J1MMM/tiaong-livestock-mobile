import "react-native-gesture-handler";
import Layout from "./app/screens/Layout";
import { AuthProvider } from "./app/context/AuthProvider";
import { DataProvider } from "./app/context/DataProvider";

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Layout />
      </DataProvider>
    </AuthProvider>
  );
}
