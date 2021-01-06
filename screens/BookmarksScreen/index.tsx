import React, { useEffect } from "react";

import { ActivityIndicator, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { Color } from "../../components";
import Issue from "../IssuesScreen/Issue";
import styles from "./styles";
import { IBookmarksScreenProps } from "../../types/navigation";
import useBookmarks from "../../hooks/useBookmarks";

export default function BookmarksScreen(props: IBookmarksScreenProps) {
  const bookmarksManager = useBookmarks();
  const { bookmarks, loading } = bookmarksManager.data;
  const { getBookmarks } = bookmarksManager.actions;

  useEffect(getBookmarks, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color={Color.blue} style={{ marginTop: 16 }} />}
      <FlatList
        data={bookmarks}
        contentContainerStyle={{ paddingTop: 16 }}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => <Issue issue={{ ...item, isBookmarked: true }} navigation={props.navigation} />}
      />
    </View>
  );
}
