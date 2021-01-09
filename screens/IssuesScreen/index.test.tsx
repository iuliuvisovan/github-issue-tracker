import React from 'react';
import IssuesScreen from './index';
import MockedNavigator from '../../navigation/MockedNavigator';
import { create, act } from 'react-test-renderer';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../../redux';
import mockIssues from '../../mocks/issues';
import fetchMock from 'fetch-mock';
import isDarkColor from 'is-dark-color';
import { NativeSyntheticEvent, TextInputFocusEventData, ActionSheetIOS } from 'react-native';
import { Color } from '../../components';

jest.mock('is-dark-color');
isDarkColor.mockReturnValue(true);

const createFreshTree = () =>
  create(
    <ReduxProvider store={store}>
      <MockedNavigator component={IssuesScreen} />
    </ReduxProvider>
  );

const tree = createFreshTree();

describe('Issues Screen', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  beforeEach(() => {
    fetchMocks();
  });

  it('renders correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('toggles filter correctly', async () => {
    const openFilterBefore = tree.root.findByProps({ testID: 'open' }).props;

    await act(async () => openFilterBefore.onPress());

    const openFilterAfter = tree.root.findByProps({ testID: 'open' }).props;
    const closedFilterAfter = tree.root.findByProps({ testID: 'closed' }).props;

    expect(openFilterAfter.style[1].backgroundColor).not.toBeDefined();
    expect(closedFilterAfter.style[1].backgroundColor).toEqual(Color.white);
  });

  it('opens and closes the RepoPicker correctly', async () => {
    const editButton = tree.root.findByProps({ testID: 'expandPickerButton' }).props;
    await act(async () => editButton.onPress());

    expect(tree.root.findByProps({ testID: 'organizationInput' })).toBeDefined();

    const cancelButton = tree.root.findByProps({ testID: 'cancelButton' }).props;
    await act(async () => cancelButton.onPress());

    expect(() => {
      tree.root.findByProps({ testID: 'organizationInput' });
    }).toThrow();
  });

  it('correctly highlights inputs at onFocus & onBlur', async () => {
    const editButton = tree.root.findByProps({ testID: 'expandPickerButton' }).props;

    await act(async () => editButton.onPress());

    const organizationInput = tree.root.findByProps({ testID: 'organizationInput' });

    const innerTextInput = organizationInput.findByType('TextInput' as any);

    await act(async () => innerTextInput.props.onFocus({} as NativeSyntheticEvent<TextInputFocusEventData>));

    expect(innerTextInput.props.style[1].borderColor).toEqual(Color.blue);

    await act(async () => innerTextInput.props.onBlur({} as NativeSyntheticEvent<TextInputFocusEventData>));

    expect(innerTextInput.props.style[1].borderColor).toEqual(Color.border);
  });

  it('correctly navigates between pages', async () => {
    const nextPageButton = tree.root.findByProps({ testID: 'nextPageButton' }).props;

    await act(async () => nextPageButton.onPress());

    const previousPageButton = tree.root.findByProps({ testID: 'previousPageButton' }).props;

    expect(previousPageButton.disabled).toBeFalsy();
  });

  it('correctly changes the sort criterion', async () => {
    const mockedShowActionSheetWithOptions = jest.spyOn(ActionSheetIOS, 'showActionSheetWithOptions');
    mockedShowActionSheetWithOptions.mockImplementation((_, callback) => {
      callback(2);
    });
    const sortButton = tree.root.findByProps({ testID: 'changeSortCriterionButton' }).props;

    await act(async () => sortButton.onPress());

    const sortButtonAfter = tree.root.findByProps({ testID: 'changeSortCriterionButton' }).props;

    const textsInsideSortButton = sortButtonAfter.children[1].props.children;

    expect(textsInsideSortButton.some((text: string) => text.toLowerCase().includes('update'))).toEqual(true);
  });
});

const fetchMocks = (): void => {
  const urls = [
    'https://api.github.com/repos/facebook/react-native/issues?state=all&sort=created&page=1',
    'https://api.github.com/repos/facebook/react-native/issues?state=all&sort=created&page=2',
    'https://api.github.com/repos/facebook/react-native/issues?state=closed&sort=created&page=1',
    'https://api.github.com/repos/facebook/react-native/issues?state=closed&sort=created&page=2',
    'https://api.github.com/repos/facebook/react-native/issues?state=closed&sort=updated&page=1',
    'https://api.github.com/repos/facebook/react-native/issues?state=closed&sort=updated&page=2',
  ];

  urls.forEach((url) => {
    fetchMock.get(url, {
      body: mockIssues,
      headers: { 'content-type': 'application/json' },
    });
  });
};
