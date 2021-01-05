import React from 'react';
import isDarkColor from 'is-dark-color';
import moment from 'moment';
import { View, Image, TouchableOpacity } from 'react-native';
import { Color, Text } from '../../../components';
import { IIssueItemProps } from '../../../types/issues';
import styles from './styles';
import { Feather } from '@expo/vector-icons';

export default function Issue(props: IIssueItemProps) {
  const { issue } = props;

  const goToDetails = () => {
    props.navigation.push('IssueDetails', { issue });
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={goToDetails} style={styles.card}>
      <View style={styles.user}>
        <Image style={styles.profileImage} source={{ uri: issue.user.avatar_url }} />
        <Text style={styles.username}>{issue.user.login}</Text>
        <Text style={styles.timeAgoText}>
          {' '}
          • {moment.duration(moment().diff(moment(issue.created_at))).humanize() + ' ago'}
        </Text>
      </View>
      <View style={[styles.state, { backgroundColor: issue.state == 'open' ? Color.green : Color.border }]}>
        <Text style={styles.stateText}>{issue.state[0].toUpperCase() + issue.state.slice(1)}</Text>
      </View>
      {issue.isBookmarked && (
        <View style={styles.star}>
          <Feather size={20} color={Color.yellow} name="star" style={{ marginRight: 4 }} />
        </View>
      )}
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
    </TouchableOpacity>
  );
}
