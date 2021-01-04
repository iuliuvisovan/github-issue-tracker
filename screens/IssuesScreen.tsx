import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, LayoutAnimation, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Color, TextInput, Text } from '../components';
import { IApplicationState } from '../redux';
import { getIssues as getIssuesAction, toggleFilter as toggleFilterAction } from '../redux/actions/issues';

export default function IssuesScreen() {
  const { list: issues, loading, filters } = useSelector((state: IApplicationState) => state.issuesReducer);

  const [organizationSlug, setOrganizationSlug] = useState('facebook');
  const [repoSlug, setRepoSlug] = useState('react-native');

  const dispatch = useDispatch();
  const getIssues = () => {
    dispatch(getIssuesAction(organizationSlug, repoSlug));
  };
  const toggleFilter = (filterId: string) => {
    LayoutAnimation.easeInEaseOut();
    dispatch(toggleFilterAction(filterId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.repositoryPicker}>
          <TextInput halfWidth name="Organization" value={organizationSlug} onChangeText={setOrganizationSlug} />
          <TextInput halfWidth name="Repository" value={repoSlug} onChangeText={setRepoSlug} />
        </View>
        <Button type="quaternary" text="Show issues" onPress={getIssues} />
      </View>

      {loading && <ActivityIndicator color={Color.blue} />}
      <Text style={styles.label}>FILTER</Text>
      <View style={styles.filters}>
        {filters.map(({ id, label, isActive }) => (
          <TouchableOpacity
            onPress={() => toggleFilter(id)}
            activeOpacity={1}
            style={[styles.filter, isActive ? styles.activeFilter : {}]}
          >
            {isActive && (
              <Feather size={16} name="check" color={Color.blue} style={{ marginRight: 4, marginLeft: -4 }} />
            )}
            <Text style={{ color: isActive ? Color.blue : undefined }}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text>{JSON.stringify(issues)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: Color.steel,
    marginTop: 7,
    fontSize: 12,
    fontFamily: 'muli-extra-bold',
    letterSpacing: 0.9,
    marginVertical: 8,
    marginTop: 24,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  activeFilter: {
    backgroundColor: Color.blue + '33',
    borderColor: Color.blue,
  },
  filter: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    paddingTop: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Color.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: 8,
    backgroundColor: Color.pageBackground,
  },
  title: {
    fontSize: 18,
    lineHeight: 18,
    fontFamily: 'muli-extra-bold',
    marginTop: 8,
    marginBottom: 16,
    color: '#414d5b',
  },
  separator: {
    marginVertical: 16,
    height: 1,
    width: '100%',
    backgroundColor: Color.border + '88',
  },
  repositoryPicker: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: Color.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
    elevation: 4,
    shadowColor: '#414d5b',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
});
