import React, { useEffect } from 'react';

import { View, Image } from 'react-native';
import isDarkColor from 'is-dark-color';
import moment from 'moment';

import { Button, Color, Text } from '../../components';
import { IIssueDetailsScreenProps } from '../../types/navigation';

import styles from './styles';
import { Feather } from '@expo/vector-icons';
import { IApplicationState } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import * as commentActions from '../../redux/actions/comments';
import * as bookmarkActions from '../../redux/actions/bookmarks';
import Comment from './Comment';
import { ScrollView } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';

export default function IssuesDetailsScreen(props: IIssueDetailsScreenProps) {
  const { issue } = props.route.params;

  const { commentList: comments } = useSelector((state: IApplicationState) => state.commentsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commentActions.getComments(issue.comments_url));
  }, []);

  const bookmark = () => {
    dispatch(bookmarkActions.addBookmark(issue));
  };

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
        {/* <Text style={styles.body}>{issue.body.slice(0, 12050)}</Text> */}
        {/* Apparently <Text> crashes above 10k characters.  */}
        <WebView source={{ html: getHtmlFromBody(issue.body) }} style={{ height: 250 }} />
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
        onPress={bookmark}
      />
      <Text style={styles.subtitle}>COMMENTS</Text>
      {comments.map((comment) => (
        <Comment key={comment.id + ''} comment={comment} />
      ))}
    </ScrollView>
  );
}

const getHtmlFromBody = (rawBody: string): string => {
  const formattedBody = rawBody
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/##([^\r]+)/g, '<h3>$1</h3>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    ;

  const html = `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><p>${formattedBody}</p></body></html>`;

  console.log('html', html);

  return html;
};
