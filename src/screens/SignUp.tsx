import {useNavigation} from '@react-navigation/native'
import { Platform } from "react-native";
import { VStack, Image, Text, Center, Heading, ScrollView, KeyboardAvoidingView } from "native-base";

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView flex={1} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <VStack flex={1} px={10}>
        <Image source={BackgroundImg} defaultSource={BackgroundImg} alt="Pessoas treinando" resizeMode="contain" position="absolute" />

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 16, justifyContent: "center", gap: 24 }}
          showsVerticalScrollIndicator={false}
        >
          <Center my={24}>
            <LogoSvg />
            <Text color="gray.100" fontSize="sm">
              Treine sua mente e o seu corpo
            </Text>
          </Center>

          <Center mt={4}>
            <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
              Crie sua conta
            </Heading>

            <Input placeholder="Nome" />
            <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
            <Input placeholder="Senha" secureTextEntry />
            <Input placeholder="Confirme a Senha" secureTextEntry />
            <Button title="Criar e acessar" />
          </Center>

          <Button title="Voltar para o login" variant="outline" mt={12} onPress={handleGoBack} />
        </ScrollView>
      </VStack>
    </KeyboardAvoidingView>
  );
}
