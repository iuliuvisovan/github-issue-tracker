import { IGithubIssue } from '../../../api/issues';
import { IssueActionType } from '../../actions/issues';

export interface IIssueState {
  list: IGithubIssue[];
  loading: Boolean;
  error?: Error;
}

export interface IIssueAction {
  type: IssueActionType;
  payload?: IGithubIssue[] | Error;
}
