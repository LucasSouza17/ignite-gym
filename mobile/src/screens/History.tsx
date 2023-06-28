import { useState } from "react";
import { Heading, VStack, SectionList, Text } from "native-base";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "26.08.22",
      data: ["Puxada frontal", "Remada unilateral"],
    },
    {
      title: "27.08.22",
      data: ["Puxada frontal"],
    }
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        px={8}
        sections={exercises}
        keyExtractor={(item) => item}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={exercises.length === 0 && {flex: 1, justifyContent: "center"}}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" fontFamily="heading" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        renderItem={({ item }) => <HistoryCard />}
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">Não há exercícios registrados ainda. {'\n'} Vamos fazer exercícios hoje?</Text>
        )}
      />
    </VStack>
  );
}
