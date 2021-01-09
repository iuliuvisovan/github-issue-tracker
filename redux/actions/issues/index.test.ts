import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getIssues } from './index';
import { IssueActionType } from '../../../types/issues';

import fetchMock from 'fetch-mock';
import { initialState } from '../../../redux/reducers/issues';
import mockIssues from '../../../mocks/issues';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Issue actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates GET_ISSUES_SUCCESS when issue fetching has succeeded', () => {
    fetchMock.getOnce('https://api.github.com/repos/facebook/react-native/issues?state=all&sort=created&page=1', {
      body: mockIssues,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: IssueActionType.GET_ISSUES_PENDING },
      { type: IssueActionType.GET_ISSUES_SUCCESS, payload: mockIssues },
    ];
    const store = mockStore({ issuesReducer: initialState });

    return store.dispatch<any>(getIssues()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_ISSUES_SUCCESS when no filter is selected', () => {
    fetchMock.getOnce('https://api.github.com/repos/facebook/react-native/issues?state=all&sort=created&page=1', {
      body: mockIssues,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: IssueActionType.GET_ISSUES_PENDING },
      { type: IssueActionType.GET_ISSUES_SUCCESS, payload: mockIssues },
    ];
    const store = mockStore({
      issuesReducer: {
        ...initialState,
        filters: [],
      },
    });

    return store.dispatch<any>(getIssues(2)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
