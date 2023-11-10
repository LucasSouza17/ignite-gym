import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "native-base";
import { Feather } from "@expo/vector-icons";

import { api } from "@services/api";

import { AppError } from "@utils/AppError";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";

import { Button } from "@components/Button";
import { Fragment, useEffect, useState } from "react";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";
import { OneSignal } from "react-native-onesignal";

type RouteParamsProps = {
  exerciseId: number;
};

export function Exercise() {
  const toast = useToast();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [isLoading, setIsLoading] = useState(true);
  const [sendingRegister, setSendingRegister] = useState(false);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

  const route = useRoute();
  const { exerciseId } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercicio";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true);

      await api.post('/history', {
        exercise_id: exerciseId
      })

      toast.show({
        title: 'Parabéns! Exercício registrado no seu histórico.',
        placement: "top",
        bgColor: "green.700",
      });

      navigation.navigate('history')
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível registrar o exercicio";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px={8} bg="gray.600" pt={12}>
        <TouchableOpacity activeOpacity={0.65} onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
        </TouchableOpacity>

        {isLoading ? (
          <HStack
            justifyContent="space-between"
            mt={4}
            mb={8}
            alignItems="center"
            space="sm"
          >
            <Skeleton
              startColor="gray.400"
              bg="gray.600"
              w="70%"
              h={6}
              borderRadius="sm"
            />
            <Skeleton startColor="gray.400" w="30%" h={6} borderRadius="sm" />
          </HStack>
        ) : (
          <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
            <Heading color="gray.100" fontSize="lg" fontFamily="heading" flexShrink={1}>
              {exercise.name}
            </Heading>

            <HStack alignItems="center">
              <BodySvg />
              <Text color="gray.200" ml={1} textTransform="capitalize">
                {exercise.group}
              </Text>
            </HStack>
          </HStack>
        )}
      </VStack>

      <ScrollView contentContainerStyle={{ flex: 1 }}>
        {isLoading ? (
          <Loading />
        ) : (
          <VStack p={8}>
            <Image
              w="full"
              h={80}
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
              }}
              alt={exercise.name}
              mb={3}
              resizeMode="cover"
              rounded="lg"
            />

            <Box bg="gray.600" rounded="md" pb={4} px={4}>
              <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
                <HStack>
                  <SeriesSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise.series} séries
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />
                  <Text color="gray.200" ml={2}>
                    {exercise.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>
              <Button
                title="Marcar como realizado"
                isLoading={sendingRegister}
                onPress={handleExerciseHistoryRegister}
              />
            </Box>
          </VStack>
        )}
      </ScrollView>
    </VStack>
  );
}
