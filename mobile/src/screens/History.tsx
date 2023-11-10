import { useCallback, useState } from "react";
import { Heading, VStack, SectionList, Text, useToast } from "native-base";
import { useFocusEffect } from "@react-navigation/native";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";
import { Loading } from "@components/Loading";
import { getExercisesDoneInWeek } from "@utils/getExercisesDoneInWeek";
import { tagUserExerciseDone } from "@notifications/notificationsTags";

export function History() {
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  async function fetchHistory() {
    try {
      setIsLoading(true);

      const response = await api.get("/history");
      setExercises(response.data);

      tagUserExerciseDone(getExercisesDoneInWeek(response.data))
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.message : "Não foi possível carregar o histórico.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          px={8}
          sections={exercises}
          keyExtractor={(item) => String(item.id)}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: "center" }
          }
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({ section }) => (
            <Heading color="gray.200" fontSize="md" fontFamily="heading" mt={10} mb={3}>
              {section.title}
            </Heading>
          )}
          renderItem={({ item }) => <HistoryCard data={item} />}
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center">
              Não há exercícios registrados ainda. {"\n"} Vamos fazer exercícios hoje?
            </Text>
          )}
        />
      )}
    </VStack>
  );
}
