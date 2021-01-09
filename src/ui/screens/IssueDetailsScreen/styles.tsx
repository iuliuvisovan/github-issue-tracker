import { StyleSheet } from 'react-native';
import { Color } from '../../components';
import issueItemStyles from '../IssuesScreen/Issue/styles';

export default StyleSheet.create({
  ...issueItemStyles,
  card: {
    ...issueItemStyles.card,
    borderRadius: 0,
    marginTop: 0,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'muli-extra-bold',
  },
  separator: {
    width: '100%',
    height: 1,
    marginTop: 16,
    backgroundColor: Color.border + '44',
  },
  body: {
    fontSize: 14,
    lineHeight: 18,
    marginTop: 16,
  },
  subtitle: {
    color: Color.steel,
    fontSize: 13,
    fontFamily: 'muli-extra-bold',
    letterSpacing: 0.9,
    marginTop: 6,
    margin: 16,
  },
  noComments: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 48,
    alignSelf: 'center',
  },
  noCommentsText: {
    color: Color.border,
    marginTop: 8,
  },
  bookmarkButton: {
    alignSelf: 'flex-end',
    marginRight: 16,
    width: 'auto',
    paddingHorizontal: 16,
  },
});
