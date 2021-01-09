import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Color, Text, TextInput } from '../../../components';
import styles from './styles';
import useCurrentPage from '../useCurrentPage';
import useIssues from '../../../hooks/useIssues';
import { AntDesign, Feather } from '@expo/vector-icons';

export default function RepoPicker() {
  const currentPageManager = useCurrentPage();
  const { organizationId: commitedOrganizationId, repoId: commitedRepoId, isPickerOpen } = currentPageManager.data;
  const { setIsPickerOpen, commitOrganizationId, commitRepoId } = currentPageManager.actions;

  const issuesManager = useIssues();
  const { getIssues } = issuesManager.actions;

  const [organizationId, setOrganizationId] = useState(commitedOrganizationId);
  const [repoId, setRepoId] = useState(commitedRepoId);

  const viewIssues = () => {
    commitOrganizationId(organizationId);
    commitRepoId(repoId);
    getIssues();
    setIsPickerOpen(false);
  };

  const cancel = () => {
    setIsPickerOpen(false);
    setRepoId(commitedRepoId);
    setRepoId(commitedOrganizationId);
  };

  const githubIcon = <AntDesign size={20} color={Color.blue} name="github" style={{ marginRight: 6 }} />;

  return isPickerOpen ? (
    <View style={styles.card}>
      <View style={styles.inputs}>
        <TextInput name="Organization" testID="organizationInput" value={organizationId} onChangeText={setOrganizationId} />
        <Text style={{ marginTop: 26, fontSize: 20, marginLeft: 2, color: Color.border }}>/</Text>
        <TextInput name="Repository" value={repoId} onChangeText={setRepoId} />
      </View>
      <View style={styles.buttonsWrapper}>
        <Button type="secondary" testID="cancelButton" text="Cancel" onPress={cancel} style={{ width: 130 }} />
        <Button type="quaternary" text="View issues" leftIcon={githubIcon} onPress={viewIssues} />
      </View>
    </View>
  ) : (
    <View style={[styles.spacedRow, { marginTop: 0 }]}>
      <Feather size={20} name="git-branch" color={Color.border} style={styles.filterIcon} />
      <Text style={styles.repoText}>{`${commitedOrganizationId} / ${commitedRepoId}`}</Text>
      <TouchableOpacity testID="expandPickerButton" onPress={() => setIsPickerOpen(true)} style={styles.editRepoButton}>
        <Feather size={14} name="edit-2" color={Color.blue} />
      </TouchableOpacity>
    </View>
  );
}
