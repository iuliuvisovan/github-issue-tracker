import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  baseButton: {
    backgroundColor: '#fff',
    borderRadius: 609,
    width: 130,
    height: 39,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#aab2ba',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.35,
    marginVertical: 8,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    width: 'auto',
    paddingHorizontal: 10,
    shadowOpacity: 0,
    elevation: 0,
  },
  tertiaryIndicator: {
    position: 'absolute',
    left: 10,
    top: 9,
  },
  tertiaryButton: {
    backgroundColor: '#00aaff',
    width: 120,
    elevation: 6,
    shadowColor: '#414d5b',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 0.4,
  },
  tertiaryText: {
    color: '#fff',
  },
  quaternaryButton: {
    flex: 0,
    width: 150,
    backgroundColor: '#fff',
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#00aaff',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  quaternaryText: {
    color: '#00aaff',
    marginHorizontal: 2,
  },
  greenButton: {
    backgroundColor: '#16c65d',
    elevation: 6,
    width: 'auto',
    shadowColor: '#414d5b',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 0.4,
    paddingHorizontal: 32,
  },
  greenText: {
    color: '#fff',
    marginHorizontal: 2,
  },
  defaultText: {
    color: '#00aaff',
    fontSize: 12,
    fontFamily: 'muli-extra-bold',
    letterSpacing: 0.8,
  },
});
