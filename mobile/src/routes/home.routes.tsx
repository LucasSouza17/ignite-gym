import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { Home } from "@screens/Home";
import { Exercise } from "@screens/Exercise";

type HomeRoutes = {
  homepage: undefined;
  exercise: {
    exerciseId: number;
  };
};

export type HomeNavigatorRoutesProps = NativeStackNavigationProp<HomeRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<HomeRoutes>();

export function HomeRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="homepage" component={Home} />
      <Screen name="exercise" component={Exercise} />
    </Navigator>
  );
}
