import { View, StatusBar } from "react-native";
import { OneSignal } from "react-native-onesignal";
import { NativeBaseProvider } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import { Routes } from "@routes/index";
import { Loading } from "@components/Loading";

import { AuthContextProvider } from "@contexts/AuthContext";

import { THEME } from "./src/theme";
import { useEffect } from "react";

OneSignal.initialize("31d29d14-61df-4b1f-b849-d5a75c72e1b7");

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    OneSignal.Notifications.requestPermission(true).then((response) => {
      console.log("Status permissão de notificação: ", response)
    })

    const unsubscribe = OneSignal.Notifications.addEventListener('click', (response) => {
      const actionId = response.result.actionId
      
      switch(actionId) {
        case '1': 
          return console.log('Ver solicitação');
        case '2':
          return console.log('Abrir app');
        default:
          return console.log('Não foi clicado botão de ação');
      }
    })

    return () => unsubscribe
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <AuthContextProvider>{fontsLoaded ? <Routes /> : <Loading />}</AuthContextProvider>
    </NativeBaseProvider>
  );
}
