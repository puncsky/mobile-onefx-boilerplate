import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { apolloClient } from "./apollo-client";
import { ADD_PUSH_TOKEN } from "./gqls";

export const registerForPushNotificationAsync = async (): Promise<string> => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    return finalStatus;
  }
  const pushToken = await Notifications.getExpoPushTokenAsync();
  if (pushToken) {
    try {
      await apolloClient.mutate({
        mutation: ADD_PUSH_TOKEN,
        variables: {
          pushToken
        }
      });
    } catch (error) {
      // tslint:disable-next-line
      console.log(`add push token fail ${error}`);
    }
  }
  return finalStatus;
};
