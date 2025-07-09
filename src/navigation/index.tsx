import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from '@/src/navigation/AuthStack';
import MainTabs from '@/src/navigation/MainTabs';
import { useAppSelector } from '@/src/store/hooks';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const loggedIn = useAppSelector(state => state.auth.loggedIn);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {loggedIn ? (
        <Stack.Screen name="Main" component={MainTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}