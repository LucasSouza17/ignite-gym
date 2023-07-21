import { useCallback, useEffect, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FlatList, HStack, Heading, Text, VStack, useToast } from "native-base";

import { api } from "@services/api";
import { HomeNavigatorRoutesProps } from "@routes/home.routes";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExerciseCard";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

export function Home() {
  const navigation = useNavigation<HomeNavigatorRoutesProps>();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groupSelected, setGroupSelected] = useState("");

  function handleOpenExerciseDetails(exerciseId: number) {
    navigation.navigate("exercise", { exerciseId });
  }

  async function fetchGroups() {
    try {
      const response = await api.get("/groups");
      setGroups(response.data);
      setGroupSelected(response.data[0]);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os grupos musculares.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/bygroup/${groupSelected}`);
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os exercicios.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected])
  );

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toUpperCase() === item.toUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent="space-between" mb={5}>
            <Heading color="gray.200" fontSize="md" fontFamily="heading">
              Exercícios
            </Heading>

            <Text color="gray.200" fontSize="sm">
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ paddingBottom: 60 }}
            renderItem={({ item }) => (
              <ExerciseCard
                data={item}
                onPress={() => handleOpenExerciseDetails(item.id)}
              />
            )}
          />
        </VStack>
      )}
    </VStack>
  );
}
