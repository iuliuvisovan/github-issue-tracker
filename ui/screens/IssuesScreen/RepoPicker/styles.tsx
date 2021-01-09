import { StyleSheet } from 'react-native';
import { Color } from '../../../components';

export default StyleSheet.create({
  inputs: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: Color.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 8,
    elevation: 4,
    shadowColor: '#414d5b',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 3,
    shadowOpacity: 0.1,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  spacedRow: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  repoText: {
    marginTop: 6,
    marginLeft: 8,
    color: Color.steel,
    fontSize: 16,
  },
  filterIcon: {
    marginLeft: 8,
    marginTop: 2,
    marginRight: 8,
  },
  editRepoButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    paddingTop: 0,
    paddingLeft: 1,

    borderRadius: 16,
    marginLeft: 12,
    borderWidth: 1,

    backgroundColor: Color.white,
    borderColor: Color.blue,
  },
});
