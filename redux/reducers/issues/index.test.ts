import { IssueAction, IssueActionType, IssueState } from '../../../types/issues';
import issuesReducer from './index';
import mockIssues, { mockFilters, mockSortCriteria } from '../../../mocks/issues';

const initialState: IssueState = {
  issues: [],
  loading: false,
  error: undefined,
  organizationId: 'facebook',
  repoId: 'react-native',
  filters: mockFilters,
  sortCriteria: mockSortCriteria,
  currentPage: 0,
};

describe('Issues Reducer', () => {
  it('handles GET_ISSUES_PENDING', () => {
    const action: IssueAction = {
      type: IssueActionType.GET_ISSUES_PENDING,
      payload: undefined,
    };

    const newState = issuesReducer(initialState, action);

    expect(newState.issues).toEqual([]);
    expect(newState.loading).toEqual(true);
  });

  it('handles GET_ISSUES_SUCCESS', () => {
    const action: IssueAction = {
      type: IssueActionType.GET_ISSUES_SUCCESS,
      payload: mockIssues,
    };

    const newState = issuesReducer(initialState, action);

    expect(newState.issues).toEqual(mockIssues);
    expect(newState.loading).toEqual(false);
  });

  it('handles SET_ORGANIZATION_SLUG', () => {
    const action: IssueAction = {
      type: IssueActionType.SET_ORGANIZATION_SLUG,
      payload: 'expo',
    };

    const newState = issuesReducer(initialState, action);

    expect(newState.organizationId).toEqual('expo');
  });
  it('handles SET_REPO_SLUG', () => {
    const action: IssueAction = {
      type: IssueActionType.SET_REPO_SLUG,
      payload: 'expo',
    };

    const newState = issuesReducer(initialState, action);

    expect(newState.repoId).toEqual('expo');
  });
  it('handles SET_PAGE', () => {
    const action: IssueAction = {
      type: IssueActionType.SET_PAGE,
      payload: 3,
    };

    const newState = issuesReducer(initialState, action);

    expect(newState.currentPage).toEqual(3);
  });
  it('handles TOGGLE_FILTER', () => {
    const targetFilter = { ...mockFilters[0] };

    const action: IssueAction = {
      type: IssueActionType.TOGGLE_FILTER,
      payload: targetFilter.id,
    };

    const newState = issuesReducer(initialState, action);

    expect(newState.filters.find((x) => x.id === targetFilter.id)?.isActive).toEqual(!targetFilter.isActive);
  });

  it('handles TOGGLE_FILTER with wrong ID', () => {
    try {
      const action: IssueAction = {
        type: IssueActionType.TOGGLE_FILTER,
        payload: 'nonexistent_id',
      };

      issuesReducer(initialState, action);

      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('nonexistent_filter');
    }
  });

  it('handles SET_SORT_CRITERION', () => {
    const criterionId = mockSortCriteria[0].id;

    const action: IssueAction = {
      type: IssueActionType.SET_SORT_CRITERION,
      payload: criterionId,
    };

    const newState = issuesReducer(initialState, action);

    expect(newState.sortCriteria.find((x) => x.id === criterionId)?.isActive).toEqual(true);
    expect(newState.sortCriteria.filter((x) => x.id !== criterionId).every((x) => x.isActive === false)).toEqual(true);
  });
  it('handles SET_SORT_CRITERION with wrong ID', () => {
    try {
      const action: IssueAction = {
        type: IssueActionType.SET_SORT_CRITERION,
        payload: 'nonexistent_id',
      };

      issuesReducer(initialState, action);

      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('nonexistent_criterion');
    }
  });

  it('handles GET_ISSUES_ERROR', () => {
    const action: IssueAction = {
      type: IssueActionType.GET_ISSUES_ERROR,
      payload: Error('test error'),
    };

    const newState = issuesReducer(initialState, action);

    expect(newState.issues).toEqual([]);
    expect(newState.loading).toEqual(false);
    expect(newState.error).toEqual(Error('test error'));
  });
});
