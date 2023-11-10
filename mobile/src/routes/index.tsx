import { useTheme, Box } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { Loading } from "@components/Loading";
import { useEffect, useState } from "react";
import {
  NotificationWillDisplayEvent,
  OSNotification,
  OneSignal,
} from "react-native-onesignal";
import { Notification } from "@components/Notification";

const linking = {
  prefixes: ["ignitegym://", "com.lucassouza.ignitegym://"],
  config: {
    screens: {
      history: {
        path: "history",
      },
      profile: {
        path: "profile",
      },
      home: {
        screens: {
          exercise: {
            path: "exercise/:exerciseId",
            parse: {
              exerciseId: (exerciseId: string) => exerciseId,
            },
          },
        },
      },
      signUp: {
        path: "signUp",
      },
      notFound: {
        path: "*"
      }
    },
  },
};

export function Routes() {
  const { colors } = useTheme();
  const { user, isLoadingUserStorageData } = useAuth();
  const [notification, setNotification] = useState<OSNotification | undefined>(undefined);

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      (NotificationReceivedEvent: NotificationWillDisplayEvent) => {
        const response = NotificationReceivedEvent.getNotification();
        setNotification(response);
      }
    );

    return () => unsubscribe;
  }, []);

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme} linking={linking as any}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
        {notification && (
          <Notification data={notification} onClose={() => setNotification(undefined)} />
        )}
      </NavigationContainer>
    </Box>
  );
}
