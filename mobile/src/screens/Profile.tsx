import { useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, KeyboardAvoidingView, useToast } from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState("https://github.com/lucassouza17.png");

  const toast = useToast();

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        allowsMultipleSelection: false,
      });

      if (photoSelected.canceled) {
        return;
      }

      if(photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri);
        
        if(photoInfo.exists && (photoInfo.size / 1024 / 1024) > 8) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 8MB.",
            placement: "top",
            bgColor: "red.500",
          })
        }

        setUserPhoto(photoSelected.assets[0].uri);
      }


    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <KeyboardAvoidingView flex={1} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={{ paddingBottom: 36 }} showsVerticalScrollIndicator={false}>
          <Center mt={6} px={10}>
            {photoIsLoading ? (
              <Skeleton
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded="full"
                startColor="gray.500"
                endColor="gray.400"
              />
            ) : (
              <UserPhoto source={{ uri: userPhoto }} alt="Foto do usuário" size={PHOTO_SIZE} />
            )}

            <TouchableOpacity activeOpacity={0.65} onPress={handleUserPhotoSelect}>
              <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
                Alterar Foto
              </Text>
            </TouchableOpacity>

            <Input bg="gray.600" placeholder="Nome" />

            <Input bg="gray.600" placeholder="E-mail" isDisabled />

            <Heading
              color="gray.200"
              fontSize="md"
              mb={2}
              alignSelf="flex-start"
              mt={12}
              fontFamily="heading"
            >
              Alterar senha
            </Heading>

            <Input bg="gray.600" placeholder="Senha antiga" secureTextEntry textContentType="oneTimeCode" />

            <Input bg="gray.600" placeholder="Nova senha" secureTextEntry textContentType="oneTimeCode" />

            <Input
              bg="gray.600"
              placeholder="Confirme a nova senha"
              secureTextEntry
              textContentType="oneTimeCode"
            />

            <Button title="Atualizar" mt={4} />
          </Center>
        </ScrollView>
      </KeyboardAvoidingView>
    </VStack>
  );
}
