import React from 'react';
import IssuesScreen from './index';
import MockedNavigator from '../../navigation/MockedNavigator';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import { Provider as ReduxProvider } from 'react-redux';
import store from '../../redux';
import mockIssues from '../../mocks/issues';
import fetchMock from 'fetch-mock';
import isDarkColor from 'is-dark-color';
import { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Color } from '../../components';

jest.mock('is-dark-color');
isDarkColor.mockReturnValue(true);

const createFreshTree = () =>
  create(
    <ReduxProvider store={store}>
      <MockedNavigator component={IssuesScreen} />
    </ReduxProvider>
  );

describe('Issues Screen', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('renders correctly', async () => {
    let tree;

    fetchMock.getOnce('https://api.github.com/repos/facebook/react-native/issues?state=all&sort=created&page=1', {
      body: mockIssues,
      headers: { 'content-type': 'application/json' },
    });

    await act(async () => {
      tree = createFreshTree();
    });

    expect(tree).toMatchSnapshot();
  });

  it('toggles filter correctly', async () => {
    let tree: ReactTestRenderer;

    fetchMock.getOnce('https://api.github.com/repos/facebook/react-native/issues?state=all&sort=created&page=1', {
      body: mockIssues,
      headers: { 'content-type': 'application/json' },
    });
    fetchMock.getOnce('https://api.github.com/repos/facebook/react-native/issues?state=closed&sort=created&page=1', {
      body: mockIssues,
      headers: { 'content-type': 'application/json' },
    });

    await act(async () => {
      tree = createFreshTree();
    });

    const openFilter = tree.root.findByProps({ testID: 'open' }).props;

    await act(async () => openFilter.onPress());

    expect(tree).toMatchSnapshot();
  });

  it('expands RepoPicker correctly', async () => {
    let tree: ReactTestRenderer;

    fetchMock.getOnce('https://api.github.com/repos/facebook/react-native/issues?state=closed&sort=created&page=1', {
      body: mockIssues,
      headers: { 'content-type': 'application/json' },
    });

    await act(async () => {
      tree = createFreshTree();
    });

    const editButton = tree.root.findByProps({ testID: 'expandPickerButton' }).props;

    await act(async () => editButton.onPress());

    const organizationInput = tree.root.findByProps({ testID: 'organizationInput' });

    const innerTextInput = organizationInput.findByType('TextInput' as any);

    await act(async () => innerTextInput.props.onFocus({} as NativeSyntheticEvent<TextInputFocusEventData>));

    expect(innerTextInput.props.style[1].borderColor).toEqual(Color.blue);

    await act(async () => innerTextInput.props.onBlur({} as NativeSyntheticEvent<TextInputFocusEventData>));

    expect(innerTextInput.props.style[1].borderColor).toEqual(Color.border);
  });
});
