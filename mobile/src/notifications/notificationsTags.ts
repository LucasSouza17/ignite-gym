import { OneSignal } from "react-native-onesignal";

export function tagUserInfoCreate(name: string, email: string) {
  OneSignal.User.addTags({
    user_name: name,
    user_email: email,
  });
}

export function tagUserInfoRemove() {
  OneSignal.User.removeTags(["user_name", "user_email"]);
}

export function tagUserExerciseDone(exercises: number) {
  OneSignal.User.addTag("user_exercise_done", String(exercises));
}
