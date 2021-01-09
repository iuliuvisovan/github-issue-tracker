import { Color } from '../../../components';
import { StyleSheet } from 'react-native';
import issueStyles from '../../IssuesScreen/Issue/styles';

export default StyleSheet.create({
  ...issueStyles,
  label: {
    color: Color.steel,
    fontSize: 12,
    fontFamily: 'muli-extra-bold',
    letterSpacing: 0.9,
    marginTop: 6,
  },
});
