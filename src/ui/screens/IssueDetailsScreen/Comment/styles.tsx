import { Color } from '../../../components';
import { Dimensions, StyleSheet } from 'react-native';
import IssueStyle from '../../IssuesScreen/Issue/styles';

export default StyleSheet.create({
  ...IssueStyle,
  label: {
    color: Color.steel,
    fontSize: 12,
    fontFamily: 'muli-extra-bold',
    letterSpacing: 0.9,
    marginTop: 6,
  },
});
