import React, { useEffect } from 'react';
import { View, FlatList, Text, TextInput, RefreshControl, TouchableOpacity, Button, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { useTheme } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { fetchRepos, setCurrent, setQuery } from '@/src/store/slices/reposSlice';
import { toggleTheme } from '@/src/store/slices/themeSlice';
import { logout } from '@/src/store/slices/authSlice';

export default function ListScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { list, page, query, loading, refreshing, hasMore, error } = useAppSelector(state => state.repos);
  const mode = useAppSelector(state => state.theme.mode);

  useEffect(() => {
    dispatch(fetchRepos({ page: 1, query }));
  }, [dispatch, query]);

  useEffect(() => {
    if (error) Alert.alert('Error', error);
  }, [error]);

  const loadMore = () => {
    if (!loading && hasMore) dispatch(fetchRepos({ page: page + 1, query }));
  };
  const onRefresh = () => dispatch(fetchRepos({ page: 1, query, refresh: true }));

  const onSelect = async (repo: any) => {
    dispatch(setCurrent(repo));
    try {
      const perm = await Notifications.getPermissionsAsync();
      if (perm.status === 'granted') {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: repo.name || 'Элемент выбран',
            body: repo.description ? repo.description.slice(0, 100) : 'Нет описания',
            sound: 'default',
          },
          android: { channelId: 'default', smallIcon: 'ic_notification' },
          trigger: null,
        });
      }
    } catch (err) {
      console.warn('Notification error', err);
    }
    router.navigate('(tabs)/explore');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8, paddingTop: 4 }}>
        <Button title={mode === 'light' ? '🌙' : '☀️'} onPress={() => dispatch(toggleTheme())} />
        <Button
          title={t('logout') ?? 'Logout'}
          onPress={() => {
            dispatch(logout());
            router.replace('login');
          }}
        />
      </View>
      <TextInput
        placeholder={t('search_placeholder')}
        placeholderTextColor={colors.text + '99'}
        value={query}
        onChangeText={text => dispatch(setQuery(text))}
        style={{ margin: 8, marginTop: 4, padding: 10, borderRadius: 8, backgroundColor: colors.card, color: colors.text }}
      />
      {loading && list.length === 0 ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" />
      ) : (
        <FlatList
          data={list}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onSelect(item)} style={{ marginHorizontal: 8, marginVertical:4, padding: 12, borderRadius:8, backgroundColor: colors.card, shadowColor:'#000', shadowOpacity:0.1, shadowRadius:4, elevation:2 }}>
              <Text style={{ fontWeight: '600', color: colors.text }}>{item.name}</Text>
              <Text style={{ color: colors.text }}>{item.description}</Text>
            </TouchableOpacity>
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListFooterComponent={loading && list.length > 0 ? <Text style={{ textAlign: 'center', padding: 12, color: colors.text }}>Loading…</Text> : null}
        />
      )}
    </SafeAreaView>
  );
} 