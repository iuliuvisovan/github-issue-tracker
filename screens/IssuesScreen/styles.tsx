import { Color, vw } from '../../components';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  issuesContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  label: {
    color: Color.steel,
    fontSize: 12,
    fontFamily: 'muli-extra-bold',
    letterSpacing: 0.9,
    marginTop: 6,
  },
  loading: {
    marginTop: 24,
    alignSelf: 'center',
  },
  spacedRow: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: Color.white,
  },
  filter: {
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    paddingTop: 6,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: Color.blue,
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,

    borderRadius: 16,
    paddingHorizontal: 16,
    marginLeft: 8,
    borderWidth: 1,

    paddingTop: 2,
    backgroundColor: Color.white,
    borderColor: Color.blue,
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
  container: {
    flex: 1,
    backgroundColor: Color.pageBackground,
  },
  title: {
    fontSize: 18,
    lineHeight: 18,
    fontFamily: 'muli-extra-bold',
    marginTop: 8,
    marginBottom: 16,
    color: '#414d5b',
  },
  separator: {
    marginVertical: 16,
    height: 1,
    width: '100%',
    backgroundColor: Color.border + '88',
  },
  repositoryInputs: {
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
  filterIcon: {
    marginLeft: 8,
    marginTop: 2,
    marginRight: 8,
  },
  caretIcon: {
    marginRight: 8,
    marginLeft: -2,
    marginTop: -1,
  },
  collapsedRepoPicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  repoText: {
    marginTop: 6,
    marginLeft: 8,
    color: Color.steel,
    fontSize: 16,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  error: {
    color: Color.red,
    alignSelf: 'center',
    marginTop: 16,
  },
  paginationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: vw,
    paddingHorizontal: 16,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 40,
    width: vw,
    zIndex: -1,
  },
  actions: {
    padding: 16,
    backgroundColor: Color.pageBackground,
  },
  scrolled: {
    elevation: 4,
    shadowColor: '#414d5b',
    shadowOffset: {
      width: 2,
      height: 4,
    },
    shadowRadius: 3,
    shadowOpacity: 0.1,
    zIndex: 10,
  },
});
