import React from 'react';
import IssuesScreen from './index';
import MockedNavigation from '../../../data/mocks/navigation';
import { create, act } from 'react-test-renderer';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../../../data/redux';
import mockIssues from '../../../data/mocks/issues';
import mockComments from '../../../data/mocks/comments';
import fetchMock from 'fetch-mock';
import isDarkColor from 'is-dark-color';
import { NativeSyntheticEvent, TextInputFocusEventData, ActionSheetIOS } from 'react-native';
import { Color } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('is-dark-color');
isDarkColor.mockReturnValue(true);

jest.spyOn(AsyncStorage, 'getItem').mockImplementation(
  () =>
    new Promise((resolve) => {
      resolve(JSON.stringify(mockIssues));
    })
);

const createFreshTree = () =>
  create(
    <ReduxProvider store={store}>
      <MockedNavigation component={IssuesScreen} />
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

  it('opens the RepoPicker, gets issues, and closes succesfully', async () => {
    const editButton = tree.root.findByProps({ testID: 'expandPickerButton' }).props;
    await act(async () => editButton.onPress());

    const viewIssuesButton = tree.root.findByProps({ testID: 'viewIssuesButton' }).props;
    await act(async () => viewIssuesButton.onPress());

    expect(() => {
      tree.root.findByProps({ testID: 'organizationInput' });
    }).toThrow();
  });

  it('navigates to IssueDetails correctly', async () => {
    isDarkColor.mockReturnValue(false);

    const cardButton = tree.root.findAllByProps({ testID: 'cardButton' })[0].props;
    await act(async () => cardButton.onPress());

    expect(true).toEqual(true);
  });

  it('toggles filter correctly', async () => {
    const openFilterBefore = tree.root.findByProps({ testID: 'open' }).props;

    await act(async () => openFilterBefore.onPress());

    const openFilterAfter = tree.root.findByProps({ testID: 'open' }).props;
    const closedFilterAfter = tree.root.findByProps({ testID: 'closed' }).props;

    expect(openFilterAfter.style[1].backgroundColor).not.toBeDefined();
    expect(closedFilterAfter.style[1].backgroundColor).toEqual(Color.white);
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

    await act(async () => previousPageButton.onPress());

    const previousPageButtonAfter = tree.root.findByProps({ testID: 'previousPageButton' }).props;

    expect(previousPageButtonAfter.disabled).toBeTruthy();
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

  it("doesn't crash when canceling sort criterion picking", async () => {
    const mockedShowActionSheetWithOptions = jest.spyOn(ActionSheetIOS, 'showActionSheetWithOptions');
    mockedShowActionSheetWithOptions.mockImplementation((_, callback) => {
      callback(-1);
    });
    const sortButton = tree.root.findByProps({ testID: 'changeSortCriterionButton' }).props;

    await act(async () => sortButton.onPress());

    expect(true).toEqual(true);
  });

  it('changes style correctly @ onScroll', async () => {
    const flatList = tree.root.findByProps({ testID: 'flatList' }).props;

    await act(async () =>
      flatList.onScroll({
        nativeEvent: {
          contentOffset: {
            y: 20,
          },
        },
      })
    );

    const scrollWrapper = tree.root.findByProps({ testID: 'scrollWrapper' }).props;

    expect(scrollWrapper.style[1].shadowColor).toEqual(Color.steel);
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

  fetchMock.get('https://api.github.com/commentsUrl', {
    body: mockComments,
    headers: { 'content-type': 'application/json' },
  });
};
