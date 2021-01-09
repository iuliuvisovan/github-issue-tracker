import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';

import { commitOrganizationId, commitRepoId, getIssues } from './index';
import { initialState } from '../../reducers/issues';
import mockIssues from '../../../mocks/issues';

import { ApplicationState } from '../..';
import { IssueActionType } from '../../../types/issues';

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

  it('creates GET_ISSUES_SUCCESS when no filters or sortCriteria are available', () => {
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
        sortCriteria: [],
      },
    });

    return store.dispatch<any>(getIssues()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('succesfully handles COMMIT_ORGANIZATION_ID', () => {
    const expectedOrganizationId = 'expo';

    const store = mockStore({
      issuesReducer: initialState,
    });

    store.dispatch<any>(commitOrganizationId(expectedOrganizationId));

    setImmediate(() => {
      expect((store.getState() as ApplicationState).issuesReducer.organizationId).toEqual(expectedOrganizationId);
    });
  });

  it('succesfully handles COMMIT_REPO_ID', () => {
    const expectedRepoId = 'expo';

    const store = mockStore({
      issuesReducer: initialState,
    });

    store.dispatch<any>(commitRepoId(expectedRepoId));

    setImmediate(() => {
      expect((store.getState() as ApplicationState).issuesReducer.repoId).toEqual(expectedRepoId);
    });
  });
});
