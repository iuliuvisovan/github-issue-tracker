import React, { useEffect, useState } from 'react';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';

import { ActionSheetIOS, ActivityIndicator, LayoutAnimation, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../../redux';
import * as issueActions from '../../redux/actions/issues';
import * as bookmarkActions from '../../redux/actions/bookmarks';

import { Button, Color, TextInput, Text } from '../../components';
import Issue from './Issue';
import styles from './styles';
import { IIssuesScreenProps } from '../../types/navigation';
import { LinearGradient } from 'expo-linear-gradient';

export default function IssuesScreen(props: IIssuesScreenProps) {
  const {
    list: issues,
    loading: loadingIssues,
    filters,
    sortCriteria,
    organizationSlug,
    repoSlug,
    page,
    error,
  } = useSelector((state: IApplicationState) => state.issuesReducer);
  const { list: bookmarks, loading: loadingBookmarks } = useSelector(
    (state: IApplicationState) => state.bookmarksReducer
  );

  const dispatch = useDispatch();
  const setOrganizationSlug = (slug: string): void => {
    dispatch(issueActions.setOrganizationSlug(slug));
  };
  const setRepoSlug = (slug: string): void => {
    dispatch(issueActions.setRepoSlug(slug));
  };
  const goToNextPage = (): void => {
    dispatch(issueActions.setPage(page + 1));
    getIssues();
  };
  const goToPreviousPage = (): void => {
    dispatch(issueActions.setPage(page - 1));
    getIssues();
  };
  const getIssues = (): void => {
    dispatch(issueActions.getIssues());
    collapseRepoPicker();
  };

  const toggleFilter = (filterId: string): void => {
    LayoutAnimation.easeInEaseOut();
    dispatch(issueActions.toggleFilter(filterId));
    getIssues();
  };

  const showSortOptions = (): void => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Cancel', ...sortCriteria.map((x) => x.label)],
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex > 0) {
          LayoutAnimation.easeInEaseOut();
          dispatch(issueActions.setSortCriterion(sortCriteria[buttonIndex - 1].id));
          getIssues();
        }
      }
    );
  };

  useEffect(() => {
    getIssues();
    dispatch(bookmarkActions.getBookmarks());
  }, []);

  const [isExpanded, setIsExpanded] = useState(false);

  const expandRepoPicker = () => {
    LayoutAnimation.easeInEaseOut();
    setIsExpanded(true);
  };

  const collapseRepoPicker = () => {
    LayoutAnimation.easeInEaseOut();
    setIsExpanded(false);
  };

  return (
    <View style={styles.container}>
      {isExpanded ? (
        <View style={styles.card}>
          <View style={styles.repositoryPicker}>
            <TextInput halfWidth name="Organization" value={organizationSlug} onChangeText={setOrganizationSlug} />
            <Text style={{ marginTop: 26, fontSize: 20, marginLeft: 2, color: Color.border }}>/</Text>
            <TextInput halfWidth name="Repository" value={repoSlug} onChangeText={setRepoSlug} />
          </View>
          <View style={styles.buttonsWrapper}>
            <Button type="secondary" text="Cancel" onPress={collapseRepoPicker} style={{ width: 130 }} />
            <Button
              type="quaternary"
              text="View issues"
              leftIcon={<AntDesign size={20} color={Color.blue} name="github" style={{ marginRight: 6 }} />}
              onPress={getIssues}
            />
          </View>

          {loadingIssues ||
            (loadingBookmarks && (
              <View style={styles.loading}>
                <ActivityIndicator color={Color.blue} />
              </View>
            ))}
        </View>
      ) : (
        <View style={[styles.spacedRow, { marginTop: 0 }]}>
          <Feather size={20} name="git-branch" color={Color.border} style={styles.filterIcon} />
          <Text style={styles.repoText}>
            {organizationSlug} / {repoSlug}
          </Text>
          <TouchableOpacity onPress={expandRepoPicker} style={styles.editRepoButton}>
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
            {isActive && (
              <Feather size={16} name="check" color={Color.blue} style={{ marginRight: 4, marginLeft: -4 }} />
            )}
            <Text style={{ color: Color.blue }}>{label} issues</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.spacedRow}>
        <Feather size={20} name="arrow-up" color={Color.border} style={styles.filterIcon} />
        <TouchableOpacity onPress={showSortOptions} style={styles.sortButton}>
          <FontAwesome size={17} name="caret-down" color={Color.blue} style={styles.caretIcon} />
          <Text style={{ color: Color.blue }}>Sort By {sortCriteria.find((x) => x.isActive)?.label}</Text>
        </TouchableOpacity>
        {(loadingIssues || loadingBookmarks) && (
          <View style={styles.loading}>
            <ActivityIndicator color={Color.blue} />
          </View>
        )}
      </View>

      {error && <Text style={styles.error}>An error occurred: {error.message}</Text>}

      <View style={styles.issues}>
        <FlatList
          data={issues}
          keyExtractor={(item) => item.id + ''}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 150 }}
          renderItem={({ item }) => (
            <Issue
              issue={{ ...item, isBookmarked: bookmarks.some((x) => x.id === item.id) }}
              navigation={props.navigation}
            />
          )}
        />
      </View>

      <View pointerEvents="box-none" style={styles.paginationButtons}>
        <Button
          style={{ width: 120 }}
          disabled={page < 2}
          type="quaternary"
          text="Previous"
          leftIcon={<Feather size={20} name="chevron-left" color={page < 2 ? Color.border : Color.blue} />}
          onPress={goToPreviousPage}
        />
        <Button
          text="Next"
          type="quaternary"
          style={{ width: 120 }}
          rightIcon={<Feather size={20} name="chevron-right" color={Color.blue} />}
          onPress={goToNextPage}
        />
        <LinearGradient
          pointerEvents="none"
          colors={[Color.steel + '00', Color.steel + '44']}
          style={styles.gradient}
        />
      </View>
    </View>
  );
}
