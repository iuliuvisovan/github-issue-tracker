import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {} from 'react-native-gesture-handler';
import { Button, Color, TextInput } from '../components';

export default function IssuesScreen() {
  function getIssues() {}

  const [organizationSlug, setOrganizationSlug] = useState('facebook');
  const [repoSlug, setRepoSlug] = useState('react-native');

  return (
    <View style={styles.container}>
      <View style={styles.repositoryPicker}>
        <TextInput halfWidth name="Organization" value={organizationSlug} onChangeText={setOrganizationSlug} />
        <TextInput halfWidth name="Repository" value={repoSlug} onChangeText={setRepoSlug} />
      </View>

      <Button text="Show issues" onPress={getIssues} />

      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginVertical: 25,
    height: 1,
    width: '100%',
    backgroundColor: Color.border + '88',
  },
  repositoryPicker: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
