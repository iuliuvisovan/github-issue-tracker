import { IGithubIssue } from '../../../api/issues';
import { IssueActionType } from '../../actions/issues';

export interface IIssueState {
  list: IGithubIssue[];
  loading: Boolean;
  error?: Error;
  filters: IssueFilter[];
}

export interface IssueFilter {
  id: string;
  label: string;
  isActive: boolean;
}

export interface IIssueAction {
  type: IssueActionType;
  payload?: IGithubIssue[] | string | Error;
}
