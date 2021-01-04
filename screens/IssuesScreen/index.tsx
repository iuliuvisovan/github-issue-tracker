import React from 'react';
import { Feather, FontAwesome } from '@expo/vector-icons';

import { ActionSheetIOS, ActivityIndicator, LayoutAnimation, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../../redux';
import * as issueActions from '../../redux/actions/issues';

import { Button, Color, TextInput, Text } from '../../components';
import Issue from './Issue';
import styles from './styles';

export default function IssuesScreen() {
  const { list: issues, loading, filters, sortCriteria, organizationSlug, repoSlug } = useSelector(
    (state: IApplicationState) => state.issuesReducer
  );
  const dispatch = useDispatch();
  const setOrganizationSlug = (slug: string): void => {
    dispatch(issueActions.setOrganizationSlug(slug));
  };
  const setRepoSlug = (slug: string): void => {
    dispatch(issueActions.setRepoSlug(slug));
  };
  const getIssues = (): void => {
    dispatch(issueActions.getIssues());
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

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.repositoryPicker}>
          <TextInput halfWidth name="Organization" value={organizationSlug} onChangeText={setOrganizationSlug} />
          <Text style={{ marginTop: 26, fontSize: 20, marginLeft: 2, color: Color.border }}>/</Text>
          <TextInput halfWidth name="Repository" value={repoSlug} onChangeText={setRepoSlug} />
        </View>
        <Button type="quaternary" text="Show issues" onPress={getIssues} />

        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator color={Color.blue} />
          </View>
        )}
      </View>

      <View style={styles.filters}>
        <Text style={styles.label}>SHOW:</Text>
        {filters.map(({ id, label, isActive }) => (
          <TouchableOpacity
            onPress={() => toggleFilter(id)}
            activeOpacity={1}
            style={[styles.filter, isActive ? styles.activeFilter : {}]}
          >
            {isActive && (
              <Feather size={16} name="check" color={Color.blue} style={{ marginRight: 4, marginLeft: -4 }} />
            )}
            <Text style={{ color: Color.blue }}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.filters}>
        <Text style={styles.label}>SORT BY:</Text>
        <TouchableOpacity onPress={showSortOptions} style={styles.sortButton}>
          <FontAwesome
            size={17}
            name="caret-down"
            color={Color.blue}
            style={{ marginRight: 8, marginLeft: -2, marginTop: -2 }}
          />
          <Text style={{ color: Color.blue }}>{sortCriteria.find((x) => x.isActive)?.label}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.issues}>
        <FlatList data={issues} renderItem={({ item }) => <Issue issue={item} />} />
      </View>
    </View>
  );
}
