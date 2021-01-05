import { Color } from '../../../components';
import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    backgroundColor: Color.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#414d5b',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
  profileImage: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    marginRight: 8,
    marginTop: 0,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: -2,
  },
  username: {
    color: Color.steel,
    fontSize: 12,
  },
  title: {
    maxWidth: Dimensions.get('screen').width - 100,
  },
  labels: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  label: {
    borderRadius: 16,
    paddingHorizontal: 10,
    height: 22,
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 8,
    marginTop: 8,
  },
  labelText: {
    fontSize: 12,
    fontFamily: 'muli-semi-bold',
  },
  timeAgo: {
    position: 'absolute',
    top: 10,
    right: 14,
  },
  timeAgoText: {
    color: Color.border,
    fontSize: 12,
  },
  state: {
    position: 'absolute',
    right: 0,
    top: 13,
    paddingRight: 14,
    paddingLeft: 12,
    paddingVertical: 4,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  stateText: {
    color: Color.white,
    fontFamily: 'muli-extra-bold',
  },
});
