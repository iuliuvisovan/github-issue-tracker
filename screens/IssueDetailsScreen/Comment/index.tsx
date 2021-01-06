import React from 'react';
import moment from 'moment';
import { View, Image } from 'react-native';
import { Text } from '../../../components';
import styles from './styles';
import { CommentProps } from '../../../types/comments';

export default function Comment(props: CommentProps) {
  const { comment } = props;

  return (
    <View style={styles.card}>
      <View style={styles.user}>
        <Image style={styles.profileImage} source={{ uri: comment.user.avatar_url }} />
        <Text style={styles.username}>{comment.user.login}</Text>
        <Text style={styles.timeAgoText}>
          {' '}
          • {moment.duration(moment().diff(moment(comment.created_at))).humanize() + ' ago'}
        </Text>
      </View>
      <Text style={styles.title}>{comment.body}</Text>
    </View>
  );
}
