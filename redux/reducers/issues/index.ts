import { IGithubIssue } from '../../../api/issues';
import { IssueActionType } from '../../actions/issues';
import { IIssueAction, IIssueState } from './types';

const initialState: IIssueState = {
  list: [],
  loading: false,
  filters: [
    { id: 'open', label: 'Open', isActive: true },
    { id: 'closed', label: 'Closed', isActive: true },
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
      };

    case IssueActionType.TOGGLE_FILTER:
      console.log('action', action);

      const newFilters = [...state.filters];

      const targetFilter = newFilters.find((x) => x.id === action.payload);
      if (targetFilter) {
        targetFilter.isActive = !targetFilter.isActive;
      }

      console.log('newFilters', newFilters);

      return {
        ...state,
        filters: newFilters,
      };

    // ---ERRORS---
    case IssueActionType.GET_ISSUES_ERROR:
      return { ...state, loading: false, error: action.payload as Error };

    default:
      return state;
  }
};
