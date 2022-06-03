import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

import AllPlaces from './screens/AllPlaces';
import AddPlace from './screens/AddPlace';
import IconButton from './components/ui/IconButton';
import { Colors } from './constants/colors';
import { init } from './util/database';
import AppLoading from 'expo-app-loading';
import PlaceDetails from './screens/PlaceDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInit, setDbInit] = useState(false);

  useEffect(() => {
    init().then(() => {
      setDbInit(true);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  if (!dbInit) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: Colors.gray700
        }}>
          <Stack.Screen name='AllPlaces' component={AllPlaces} 
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({tintColor}) => <IconButton icon='add' size={24} color={tintColor} onPress={() => navigation.navigate('AddPlace')} />
          })} />
          <Stack.Screen name='AddPlace' component={AddPlace} options={{
            title: 'Add A New Place'
          }} />
          <Stack.Screen name='PlaceDetails' component={PlaceDetails} options={{
            title: 'Loading Place...'
          }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

