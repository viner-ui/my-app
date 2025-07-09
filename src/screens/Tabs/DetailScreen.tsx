import React from 'react';
import { View, Text, Button, Linking } from 'react-native';
import { useAppSelector } from '@/src/store/hooks';
import { useTheme } from '@react-navigation/native';

export default function DetailScreen() {
  const repo = useAppSelector(state => state.repos.current);
  const { colors } = useTheme();

  if (!repo) return <Text style={{ marginTop: 40, textAlign: 'center', color: colors.text }}>Выберите элемент</Text>;

  return (
    <View style={{ padding: 16, backgroundColor: colors.background, flex:1 }}>
      <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>{repo.name}</Text>
      <Text style={{ marginVertical: 8, color: colors.text }}>{repo.description}</Text>
      <Button title="Open on GitHub" onPress={() => Linking.openURL(repo.html_url)} color={colors.primary}
      />
    </View>
  );
} 