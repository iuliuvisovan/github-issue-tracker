import { Issue, IssueActionType, IssueState, IssueAction } from '../../../types/issues';

const defaultFilters = [
  { id: 'open', label: 'Open', isActive: true },
  { id: 'closed', label: 'Closed', isActive: true },
];

const defaultSortCriteria = [
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
    label: 'Number Of Comments',
    isActive: false,
  },
];

export const initialState: IssueState = {
  issues: [],
  loading: false,
  organizationId: 'facebook',
  repoId: 'react-native',
  filters: defaultFilters,
  sortCriteria: defaultSortCriteria,
  currentPage: 1,
};

export default (state: IssueState = initialState, action: IssueAction): IssueState => {
  switch (action.type) {
    // ---PENDINGS---
    case IssueActionType.GET_ISSUES_PENDING:
      return { ...state, loading: true };

    // ---SUCCESSES---
    case IssueActionType.GET_ISSUES_SUCCESS:
      return {
        ...state,
        issues: action.payload as Issue[],
        loading: false,
        error: undefined,
      };

    case IssueActionType.COMMIT_ORGANIZATION_ID:
      return {
        ...state,
        organizationId: action.payload as string,
      };

    case IssueActionType.COMMIT_REPO_ID:
      return {
        ...state,
        repoId: action.payload as string,
      };

    case IssueActionType.SET_PAGE:
      return {
        ...state,
        currentPage: action.payload as number,
      };

    case IssueActionType.TOGGLE_FILTER:
      const newFilters = [...state.filters];

      const targetFilter = newFilters.find((x) => x.id === action.payload);

      if (targetFilter) {
        targetFilter.isActive = !targetFilter.isActive;
      } else {
        throw Error('nonexistent_filter');
      }

      return {
        ...state,
        filters: newFilters,
        currentPage: 1,
      };

    case IssueActionType.SET_SORT_CRITERION:
      const newSortCriteria = [...state.sortCriteria].map((x) => ({ ...x, isActive: false }));

      const targetCriterion = newSortCriteria.find((x) => x.id === action.payload);
      if (targetCriterion) {
        targetCriterion.isActive = true;
      } else {
        throw Error('nonexistent_criterion');
      }

      return {
        ...state,
        sortCriteria: newSortCriteria,
        currentPage: 1,
      };

    // ---ERRORS---
    case IssueActionType.GET_ISSUES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload as Error,
        issues: [],
        currentPage: 1,
      };

    default:
      return state;
  }
};
