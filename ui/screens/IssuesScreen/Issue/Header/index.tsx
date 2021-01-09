import React from 'react';
import moment from 'moment';
import { View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Color, Text } from '../../../../components';
import styles from './styles';

import { IssueHeaderProps } from '../../../../../data/types/issues';

export default function Header(props: IssueHeaderProps) {
  const { issue } = props;

  return (
    <>
      <View style={styles.user}>
        <Image style={styles.profileImage} source={{ uri: issue.user.avatar_url }} />
        <Text style={styles.username}>{issue.user.login}</Text>
        <Text style={styles.timeAgoText}> • {moment.duration(moment().diff(moment(issue.created_at))).humanize() + ' ago'}</Text>
        {issue.isBookmarked && (
          <>
            <Text style={styles.timeAgoText}> • </Text>
            <AntDesign size={16} color={Color.border} name="star" />
          </>
        )}
      </View>
      <View style={[styles.state, { backgroundColor: issue.state == 'open' ? Color.green : Color.border }]}>
        <Text style={styles.stateText}>{issue.state[0].toUpperCase() + issue.state.slice(1)}</Text>
      </View>
    </>
  );
}
