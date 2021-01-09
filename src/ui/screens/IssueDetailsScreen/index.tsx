import React, { useEffect } from 'react';

import { View, Image, ScrollView, LayoutAnimation } from 'react-native';
import { WebView } from 'react-native-webview';
import isDarkColor from 'is-dark-color';

import { Button, Color, Text } from '../../components';
import { IssueDetailsScreenProps } from '../../../data/types/navigation';

import styles from './styles';
import { AntDesign, Feather } from '@expo/vector-icons';
import { ApplicationState } from '../../../data/redux';
import { useDispatch, useSelector } from 'react-redux';
import * as commentActions from '../../../data/redux/actions/comments';
import * as bookmarkActions from '../../../data/redux/actions/bookmarks';
import Comment from './Comment';
import Header from '../IssuesScreen/Issue/Header';

export default function IssuesDetailsScreen(props: IssueDetailsScreenProps) {
  const { issue } = props.route.params;

  const { bookmarks: bookmarks } = useSelector((state: ApplicationState) => state.bookmarksReducer);
  const { comments: comments } = useSelector((state: ApplicationState) => state.commentsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commentActions.getComments(issue.comments_url));
  }, []);

  const addAsBookmark = () => {
    LayoutAnimation.easeInEaseOut();
    dispatch(bookmarkActions.addBookmark(issue));
  };

  const removeAsBookmark = () => {
    LayoutAnimation.easeInEaseOut();
    dispatch(bookmarkActions.removeBookmark(issue.id));
  };

  const isBookmarked = bookmarks.some((x) => x.id === issue.id);
  const bookmarkIcon = <AntDesign size={20} color={Color.blue} name={isBookmarked ? 'star' : 'staro'} style={{ marginRight: 6 }} />;

  return (
    <ScrollView>
      <View style={styles.card}>
        <Header issue={{ ...issue, isBookmarked }} />
        <Text style={styles.title}>{issue.title}</Text>
        <View style={styles.separator}></View>
        {/* <Text style={styles.body}>{issue.body.slice(0, 12050)}</Text> */}
        {/* Apparently <Text> crashes after 10k characters of content.  */}
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
        text={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
        style={styles.bookmarkButton}
        testID="addAsBookmarkButton"
        leftIcon={bookmarkIcon}
        onPress={isBookmarked ? removeAsBookmark : addAsBookmark}
      />
      {comments.length ? (
        <Text style={styles.subtitle}>COMMENTS</Text>
      ) : (
        <View style={styles.noComments}>
          <Feather size={40} color={Color.border} name="message-square" style={{ marginRight: 4 }} />
          <Text style={styles.noCommentsText}>No comments to show.</Text>
        </View>
      )}

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
    .replace(/`([^`]+)`/g, '<code>$1</code>');
    
  const html = `<html style="overflow: hidden">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@300;400;500&display=swap" rel="stylesheet">
    </head>
    <body style="font-family: Mulish; overflow: hidden">
      <p>${formattedBody}</p>
    </body>
  </html>
  `;

  return html;
};
