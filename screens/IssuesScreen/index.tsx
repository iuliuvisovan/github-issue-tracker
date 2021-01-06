import React, { useEffect, useRef } from "react";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";

import { ActivityIndicator, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import { Button, Color, TextInput, Text } from "../../components";
import Issue from "./Issue";
import styles from "./styles";
import { IIssuesScreenProps } from "../../types/navigation";
import { LinearGradient } from "expo-linear-gradient";
import useCurrentPage from "./useCurrentPage";
import useDeepCompareEffect from "use-deep-compare-effect";
import useList from "../../hooks/useList";
import * as issueActions from "../../redux/actions/issues";
import * as bookmarkActions from "../../redux/actions/bookmarks";
import { IApplicationState } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { IGithubIssue } from "../../types/issues";

export default function IssuesScreen(props: IIssuesScreenProps) {
  const issuesReducer = useSelector((state: IApplicationState) => state.issuesReducer);
  const { list: issues, loading: loadingIssues, filters, sortCriteria, currentPage, error } = issuesReducer;

  const { list: bookmarks, loading: loadingBookmarks } = useSelector((state: IApplicationState) => state.bookmarksReducer);

  const { getList: getIssues, toggleFilter, setSortCriterion, goToPage } = useList(issueActions);
  const { getList: getBookmarks } = useList(bookmarkActions);

  const { organizationId, repoId, isPickerOpen, setIsPickerOpen, isScrolled, setIsScrolled, pickSortCriterion } = useCurrentPage();

  useEffect(() => {
    getIssues();
    getBookmarks();
  }, []);

  useDeepCompareEffect(getIssues, [currentPage, filters, sortCriteria]);

  const flatListRef = useRef<FlatList<IGithubIssue>>(null);
  useEffect(() => {
    flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 });
    setIsPickerOpen(false);
  }, [issuesReducer]);

  const changeSortCriterion = async () => {
    const pickedCriterion = await pickSortCriterion(sortCriteria);
    setSortCriterion(pickedCriterion);
  };

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={[styles.actions, isScrolled ? styles.scrolled : {}]}>
        {isPickerOpen ? (
          <View style={styles.card}>
            <View style={styles.repositoryInputs}>
              <TextInput
                halfWidth
                name="Organization"
                value={organizationId}
                onChangeText={(value) => dispatch(issueActions.setOrganizationId(value))}
              />
              <Text style={{ marginTop: 26, fontSize: 20, marginLeft: 2, color: Color.border }}>/</Text>
              <TextInput halfWidth name="Repository" value={repoId} onChangeText={(value) => dispatch(issueActions.setRepoId(value))} />
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
            <Text style={styles.repoText}>
              {organizationId} / {repoId}
            </Text>
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
          keyExtractor={(item) => item.id + ""}
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
          onPress={() => goToPage(currentPage - 1)}
        />
        <Button
          type="quaternary"
          text="Next"
          style={{ width: 120 }}
          rightIcon={<Feather size={20} name="chevron-right" color={Color.blue} />}
          onPress={() => goToPage(currentPage + 1)}
        />
        <LinearGradient pointerEvents="none" colors={[Color.steel + "00", Color.steel + "44"]} style={styles.gradient} />
      </View>
    </View>
  );
}
