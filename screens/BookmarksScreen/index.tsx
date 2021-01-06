import React, { useEffect } from 'react';

import { ActivityIndicator, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../../redux';
import * as bookmarkActions from '../../redux/actions/bookmarks';

import { Color } from '../../components';
import Issue from '../IssuesScreen/Issue';
import styles from './styles';
import { IBookmarksScreenProps } from '../../types/navigation';

export default function BookmarksScreen(props: IBookmarksScreenProps) {
  const { bookmarks: bookmarks, loading } = useSelector((state: IApplicationState) => state.bookmarksReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(bookmarkActions.getBookmarks());
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color={Color.blue} style={{ marginTop: 16 }} />}
      <FlatList
        data={bookmarks}
        contentContainerStyle={{ paddingTop: 16 }}
        keyExtractor={(item) => item.id + ''}
        renderItem={({ item }) => <Issue issue={{ ...item, isBookmarked: true }} navigation={props.navigation} />}
      />
    </View>
  );
}
