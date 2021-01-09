import React, { useEffect, useState } from 'react';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';

import { ActivityIndicator, LayoutAnimation, View, FlatList, TouchableOpacity } from 'react-native';

import { Button, Color, TextInput, Text } from '../../components';
import Issue from './Issue';
import RepoPicker from './RepoPicker';
import styles from './styles';
import { IssuesScreenProps } from '../../types/navigation';
import { LinearGradient } from 'expo-linear-gradient';
import useCurrentPage from './useCurrentPage';

import useIssues from '../../hooks/useIssues';
import useBookmarks from '../../hooks/useBookmarks';

export default function IssuesScreen(props: IssuesScreenProps) {
  const issuesManager = useIssues();
  const { issues, loading: loadingIssues, filters, sortCriteria, currentPage, error } = issuesManager.data;
  const { getIssues, toggleFilter, setSortCriterion, setPage } = issuesManager.actions;

  const bookmarksManager = useBookmarks();
  const { bookmarks, loading: loadingBookmarks } = bookmarksManager.data;
  const { getBookmarks } = bookmarksManager.actions;

  const currentPageManager = useCurrentPage();
  const { isScrolled, flatListRef } = currentPageManager.data;
  const { setIsPickerOpen, setIsScrolled, pickSortCriterion } = currentPageManager.actions;

  const changeSortCriterion = async () => {
    const pickedCriterion = await pickSortCriterion(sortCriteria);
    setSortCriterion(pickedCriterion);
  };

  useEffect(() => {
    getIssues();
    getBookmarks();
  }, []);

  useEffect(() => {
    LayoutAnimation.easeInEaseOut();
    setIsPickerOpen(false);
    setIsScrolled(false);
  }, [issues]);

  return (
    <View style={styles.container}>
      <View testID="scrollWrapper" style={[styles.actions, isScrolled ? styles.scrolled : {}]}>
        <RepoPicker />
        <View style={styles.spacedRow}>
          <Feather size={20} name="sliders" color={Color.border} style={styles.filterIcon} />
          {filters.map(({ id, label, isActive }) => (
            <TouchableOpacity
              onPress={() => toggleFilter(id)}
              activeOpacity={1}
              testID={id}
              key={id}
              style={[styles.filter, isActive ? styles.activeFilter : {}]}
            >
              {isActive && <Feather size={16} name="check" color={Color.blue} style={{ marginRight: 4, marginLeft: -4 }} />}
              <Text style={{ color: Color.blue }}>{label} issues</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.spacedRow}>
          <Feather size={20} name="arrow-up" color={Color.border} style={styles.filterIcon} />
          <TouchableOpacity testID="changeSortCriterionButton" onPress={changeSortCriterion} style={styles.sortButton}>
            <FontAwesome size={17} name="caret-down" color={Color.blue} style={styles.caretIcon} />
            <Text style={{ color: Color.blue }}>Sort By {sortCriteria.find((x) => x.isActive)?.label}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {error && <Text style={styles.error}>An error occurred: {error.message}</Text>}

      {loadingIssues || loadingBookmarks ? (
        <View style={styles.loading}>
          <ActivityIndicator color={Color.blue} />
        </View>
      ) : (
        <FlatList
          data={issues}
          ref={flatListRef}
          onScroll={(event) => setIsScrolled(event.nativeEvent.contentOffset.y >= 16)}
          testID="flatList"
          keyExtractor={(item) => item.id + ''}
          contentContainerStyle={styles.issuesContainer}
          renderItem={({ item }) => (
            <Issue issue={{ ...item, isBookmarked: bookmarks.some((x) => x.id === item.id) }} navigation={props.navigation} />
          )}
        />
      )}

      <View pointerEvents="box-none" style={styles.paginationButtons}>
        <Button
          type="quaternary"
          style={{ width: 120 }}
          disabled={currentPage < 2}
          text="Previous"
          testID="previousPageButton"
          leftIcon={<Feather size={20} name="chevron-left" color={currentPage < 2 ? Color.border : Color.blue} />}
          onPress={() => setPage(currentPage - 1)}
        />
        <Button
          type="quaternary"
          text="Next"
          testID="nextPageButton"
          style={{ width: 120 }}
          rightIcon={<Feather size={20} name="chevron-right" color={Color.blue} />}
          onPress={() => setPage(currentPage + 1)}
        />
        <LinearGradient pointerEvents="none" colors={[Color.steel + '00', Color.steel + '44']} style={styles.gradient} />
      </View>
    </View>
  );
}
