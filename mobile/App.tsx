import { View, StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import { Routes } from "@routes/index";
import { Loading } from "@components/Loading";

import { AuthContextProvider } from "@contexts/AuthContext";

import { THEME } from "./src/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <AuthContextProvider>{fontsLoaded ? <Routes /> : <Loading />}</AuthContextProvider>
    </NativeBaseProvider>
  );
}
