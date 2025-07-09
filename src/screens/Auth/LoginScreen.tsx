import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useAppDispatch } from '@/src/store/hooks';
import { login } from '@/src/store/slices/authSlice';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';

export default function LoginScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const onSubmit = async () => {
    if (user === 'admin' && pass === '1234') {
      try {
        dispatch(login());
        // Небольшая задержка чтобы Redux успел перерендерить стек
        setTimeout(() => router.replace('(tabs)'), 10);
      } catch (e) {
        console.warn('Login navigation error', e);
      }
    } else {
      Alert.alert(t('wrong_creds'));
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16, backgroundColor: colors.background }}>
      <TextInput
        placeholder={t('username')}
        value={user}
        onChangeText={setUser}
        style={{ borderWidth: 1, borderColor: colors.border, color: colors.text, marginBottom: 12, padding: 8, borderRadius:8 }}
      />
      <TextInput
        placeholder={t('password')}
        value={pass}
        onChangeText={setPass}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: colors.border, color: colors.text, marginBottom: 12, padding: 8, borderRadius:8 }}
      />
      <Button title={t('login')} onPress={onSubmit} color={colors.primary} />
    </View>
  );
} 