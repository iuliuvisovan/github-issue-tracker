import { IGithubIssue } from '../../../api/issues';
import { IssueActionType } from '../../actions/issues';
import { IIssueAction, IIssueState } from './types';

const initialState: IIssueState = {
  list: [],
  loading: false,
  organizationSlug: 'facebook',
  repoSlug: 'react-native',
  filters: [
    { id: 'open', label: 'Open', isActive: true },
    { id: 'closed', label: 'Closed', isActive: true },
  ],
  sortCriteria: [
    {
      id: 'created',
      label: 'Created Date',
      isActive: true,
    },
    {
      id: 'updated',
      label: 'Updated Date',
      isActive: false,
    },
    {
      id: 'comments',
      label: 'Number of comments',
      isActive: false,
    },
  ],
};

export default (state: IIssueState = initialState, action: IIssueAction): IIssueState => {
  switch (action.type) {
    // ---PENDINGS---
    case IssueActionType.GET_ISSUES_PENDING:
      return { ...state, loading: true };

    // ---SUCCESSES---
    case IssueActionType.GET_ISSUES_SUCCESS:
      return {
        ...state,
        list: action.payload as IGithubIssue[],
        loading: false,
        error: undefined,
      };

    case IssueActionType.SET_ORGANIZATION_SLUG:
      return {
        ...state,
        organizationSlug: action.payload as string,
      };

    case IssueActionType.SET_REPO_SLUG:
      return {
        ...state,
        repoSlug: action.payload as string,
      };

    case IssueActionType.TOGGLE_FILTER:
      const newFilters = [...state.filters];

      const targetFilter = newFilters.find((x) => x.id === action.payload);
      if (targetFilter) {
        targetFilter.isActive = !targetFilter.isActive;
      }

      return {
        ...state,
        filters: newFilters,
      };

    case IssueActionType.SET_SORT_CRITERION:
      const newSortCriteria = [...state.sortCriteria].map((x) => ({ ...x, isActive: false }));

      const targetCriterion = newSortCriteria.find((x) => x.id === action.payload);
      if (targetCriterion) {
        targetCriterion.isActive = true;
      }

      return {
        ...state,
        sortCriteria: newSortCriteria,
      };

    // ---ERRORS---
    case IssueActionType.GET_ISSUES_ERROR:
      return { ...state, loading: false, error: action.payload as Error };

    default:
      return state;
  }
};
