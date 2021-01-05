import React, { useEffect } from 'react';

import { View, Image, TouchableOpacity, FlatList } from 'react-native';
import isDarkColor from 'is-dark-color';
import moment from 'moment';

import { Button, Color, Text } from '../../components';
import { IIssueDetailsScreenProps } from '../../types/navigation';

import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { IApplicationState } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import * as commentActions from '../../redux/actions/comments';
import Comment from './Comment';
import { ScrollView } from 'react-native-gesture-handler';

export default function IssuesDetailsScreen(props: IIssueDetailsScreenProps) {
  const { issue } = props.route.params;

  const { commentList: comments } = useSelector((state: IApplicationState) => state.commentsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commentActions.getComments(issue.comments_url));
  }, []);

  return (
    <ScrollView>
      <View style={styles.card}>
        <View style={styles.user}>
          <Image style={styles.profileImage} source={{ uri: issue.user.avatar_url }} />
          <Text style={styles.username}>{issue.user.login}</Text>
          <Text style={styles.timeAgoText}>
            {' '}
            • {moment.duration(moment().diff(moment(issue.created_at))).humanize() + ' ago'}
          </Text>
        </View>

        <View style={[styles.state, { backgroundColor: issue.state == 'open' ? Color.green : Color.steel }]}>
          <Text style={styles.stateText}>{issue.state[0].toUpperCase() + issue.state.slice(1)}</Text>
        </View>

        <Text style={styles.title}>{issue.title}</Text>
        <View style={styles.separator}></View>
        <Text style={styles.body}>{issue.body}</Text>
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
      <Button
        text="Bookmark"
        style={{ alignSelf: 'flex-end', marginRight: 16 }}
        leftIcon={<Feather size={20} color={Color.blue} name="star" style={{ marginRight: 4 }} />}
      />
      <Text style={styles.subtitle}>COMMENTS</Text>
      {comments.map((comment) => (
        <Comment key={comment.id + ''} comment={comment} />
      ))}
    </ScrollView>
  );
}
