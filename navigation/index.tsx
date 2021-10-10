import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import Home from '../components/Home';

import NotFoundScreen from '../screens/NotFoundScreen';
import SubcategoryScreen from '../screens/SubcategoryScreen';
import StartFinishScreen from '../screens/StartFinishScreen';
import FlashcardsScreen from '../screens/FlashcardsScreen';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import SettingsScreen from '../screens/SettingsScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Subcategory" component={SubcategoryScreen} />
      <Stack.Screen name="StartFinish" component={StartFinishScreen} />
      <Stack.Screen name="Flashcards" component={FlashcardsScreen} options={{gestureEnabled: false, cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}}/>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
