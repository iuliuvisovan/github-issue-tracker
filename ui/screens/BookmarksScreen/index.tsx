import React, { useEffect } from 'react';
import { ActivityIndicator, View, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Color, Text } from '../../components';
import useBookmarks from '../../hooks/useBookmarks';
import styles from './styles';

import Issue from '../IssuesScreen/Issue';
import { BookmarksScreenProps } from '../../../data/types/navigation';

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
          <Text style={styles.noBookmarksText}>Bookmarked issues will appear here!</Text>
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
