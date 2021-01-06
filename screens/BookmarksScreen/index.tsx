import React, { useEffect } from 'react';

import { ActivityIndicator, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Color, Text } from '../../components';
import Issue from '../IssuesScreen/Issue';
import styles from './styles';
import { BookmarksScreenProps } from '../../types/navigation';
import useBookmarks from '../../hooks/useBookmarks';
import { Feather } from '@expo/vector-icons';

export default function BookmarksScreen(props: BookmarksScreenProps) {
  const bookmarksManager = useBookmarks();
  const { bookmarks, loading } = bookmarksManager.data;
  const { getBookmarks } = bookmarksManager.actions;

  useEffect(getBookmarks, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color={Color.blue} style={{ marginTop: 16 }} />}
      {!bookmarks.length && (
        <View style={styles.noBookmarks}>
          <Feather size={60} color={Color.border + '88'} name="star" style={{ marginRight: 4 }} />
          <Text style={styles.noBookmarksText}>Bookmarked issues will be shown here.</Text>
        </View>
      )}
      <FlatList
        data={bookmarks}
        contentContainerStyle={{ paddingTop: 16 }}
        keyExtractor={(item) => item.id + ''}
        renderItem={({ item }) => <Issue issue={{ ...item, isBookmarked: true }} navigation={props.navigation} />}
      />
    </View>
  );
}
