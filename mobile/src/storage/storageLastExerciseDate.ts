import AsyncStorage from "@react-native-async-storage/async-storage";

import { LAST_EXERCISE_DATE_STORAGE  } from "@storage/storageConfig";

export async function storageLastExerciseDateSave(date: string) {
  await AsyncStorage.setItem(LAST_EXERCISE_DATE_STORAGE, JSON.stringify(date));
}

export async function storageLastExerciseDateGet() {
  const storage = await AsyncStorage.getItem(LAST_EXERCISE_DATE_STORAGE);

  const date: string = storage ? JSON.parse(storage) : {};

  return date;
}

export async function storageLastExerciseDateRemove() {
  await AsyncStorage.removeItem(LAST_EXERCISE_DATE_STORAGE);
}