import React from 'react';

import { View, Image } from 'react-native';

import { Color, Text } from '../../../components';
import styles from './styles';
import { IGithubIssue } from '../../../api/issues';
import moment from 'moment';
import isDarkColor from 'is-dark-color';

export default function Issue(props: IIssueProps) {
  const { issue } = props;

  return (
    <View style={styles.card}>
      <View style={styles.user}>
        <Image style={styles.profileImage} source={{ uri: issue.user.avatar_url }} />
        <Text style={styles.username}>{issue.user.login}</Text>
        <Text style={styles.timeAgoText}>
          {' '}
          • {moment.duration(moment().diff(moment(issue.created_at))).humanize() + ' ago'}
        </Text>
      </View>
      <Text style={styles.title}>{issue.title}</Text>
      <View style={styles.labels}>
        {issue.labels.map((label) => (
          <View key={label.id} style={[styles.label, { backgroundColor: '#' + label.color }]}>
            <Text style={[styles.labelText, { color: isDarkColor('#' + label.color) ? Color.white : Color.steel }]}>
              {label.name.replace(/\:([a-z]+)\:/g, '')}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export interface IIssueProps {
  issue: IGithubIssue;
}
