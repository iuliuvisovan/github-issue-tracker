import { IGithubIssue } from '../../../api/issues';
import { IssueActionType } from '../../actions/issues';
import { IIssueAction, IIssueState } from './types';

const initialState: IIssueState = {
  list: [],
  loading: false,
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

    // ---ERRORS---
    case IssueActionType.GET_ISSUES_ERROR:
      return { ...state, loading: false, error: action.payload as Error };

    default:
      return state;
  }
};
