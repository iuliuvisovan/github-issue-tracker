import { StyleSheet } from 'react-native';
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
  },
});
