import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Alert, Platform } from 'react-native';
import { useEffect } from 'react';

import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true
    };
  }
});

export default function App() {
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;
      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }


      if (finalStatus !== 'granted') {
        Alert.alert('Permissions Required', 'Push Notifictions need the appropriate permissions.');
        return;
      }
      console.log(finalStatus);
      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      // normally you would store this push token into a backend database.
      console.log(pushTokenData);

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT
        });
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      const userName = notification.request.content.data.userName;
      console.log(userName);
    });

    const subscription2 = Notifications.addNotificationResponseReceivedListener((reponse) => {
      console.log(reponse);
    });

    return () => {
      subscription.remove();
      subscription2.remove();
    }
  }, []);

  async function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My first local notification.',
        body: 'This is the body of the notification.',
        data: { userName: 'Connor' }
      },
      trigger: {
        seconds: 5
      }
    });
  }

  function sendPushNotificationHandler() {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // for the 'to' field you would need to put in the push token data for the unique device.
        to: '',
        title: 'Test',
        body: 'This is a test!'
      })
    });
  }

  return (
    <View style={styles.container}>
      <Button title='Schedule Notification' onPress={scheduleNotificationHandler} />
      <Button title='Send Push Notification' onPress={sendPushNotificationHandler} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
