import React, { useEffect } from 'react';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';

import { ActivityIndicator, LayoutAnimation, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { Button, Color, TextInput, Text } from '../../components';
import Issue from './Issue';
import styles from './styles';
import { IssuesScreenProps } from '../../types/navigation';
import { LinearGradient } from 'expo-linear-gradient';
import useCurrentPage from './useCurrentPage';
import useDeepCompareEffect from 'use-deep-compare-effect';

import useIssues from '../../hooks/useIssues';
import useBookmarks from '../../hooks/useBookmarks';

export default function IssuesScreen(props: IssuesScreenProps) {
  const issuesManager = useIssues();
  const { issues, loading: loadingIssues, filters, sortCriteria, currentPage, error } = issuesManager.data;
  const { getIssues, toggleFilter, setSortCriterion, setPage, setOrganizationId, setRepoId } = issuesManager.actions;

  const bookmarksManager = useBookmarks();
  const { bookmarks, loading: loadingBookmarks } = bookmarksManager.data;
  const { getBookmarks } = bookmarksManager.actions;

  const currentPageManager = useCurrentPage();
  const { organizationId, repoId, isPickerOpen, isScrolled, flatListRef } = currentPageManager.data;
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

  useDeepCompareEffect(() => {
    console.log('Changed here something');
    getIssues();
  }, [sortCriteria]);

  return (
    <View style={styles.container}>
      <View style={[styles.actions, isScrolled ? styles.scrolled : {}]}>
        {isPickerOpen ? (
          <View style={styles.card}>
            <View style={styles.repositoryInputs}>
              <TextInput name="Organization" value={organizationId} onChangeText={setOrganizationId} />
              <Text style={{ marginTop: 26, fontSize: 20, marginLeft: 2, color: Color.border }}>/</Text>
              <TextInput name="Repository" value={repoId} onChangeText={setRepoId} />
            </View>
            <View style={styles.buttonsWrapper}>
              <Button type="secondary" text="Cancel" onPress={() => setIsPickerOpen(false)} style={{ width: 130 }} />
              <Button
                type="quaternary"
                text="View issues"
                leftIcon={<AntDesign size={20} color={Color.blue} name="github" style={{ marginRight: 6 }} />}
                onPress={getIssues}
              />
            </View>
          </View>
        ) : (
          <View style={[styles.spacedRow, { marginTop: 0 }]}>
            <Feather size={20} name="git-branch" color={Color.border} style={styles.filterIcon} />
            <Text style={styles.repoText}>{`${organizationId} / ${repoId}`}</Text>
            <TouchableOpacity onPress={() => setIsPickerOpen(true)} style={styles.editRepoButton}>
              <Feather size={14} name="edit-2" color={Color.blue} />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.spacedRow}>
          <Feather size={20} name="sliders" color={Color.border} style={styles.filterIcon} />
          {filters.map(({ id, label, isActive }) => (
            <TouchableOpacity
              onPress={() => toggleFilter(id)}
              activeOpacity={1}
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
          <TouchableOpacity onPress={changeSortCriterion} style={styles.sortButton}>
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
          leftIcon={<Feather size={20} name="chevron-left" color={currentPage < 2 ? Color.border : Color.blue} />}
          onPress={() => setPage(currentPage - 1)}
        />
        <Button
          type="quaternary"
          text="Next"
          style={{ width: 120 }}
          rightIcon={<Feather size={20} name="chevron-right" color={Color.blue} />}
          onPress={() => setPage(currentPage + 1)}
        />
        <LinearGradient pointerEvents="none" colors={[Color.steel + '00', Color.steel + '44']} style={styles.gradient} />
      </View>
    </View>
  );
}
