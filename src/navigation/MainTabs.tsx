import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListScreen from '@/src/screens/Tabs/ListScreen';
import DetailScreen from '@/src/screens/Tabs/DetailScreen';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icon = route.name === 'List' ? 'list' : 'information-circle';
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="List" component={ListScreen} options={{ title: t('list_title') }} />
      <Tab.Screen name="Detail" component={DetailScreen} options={{ title: t('detail_title') }} />
    </Tab.Navigator>
  );
}