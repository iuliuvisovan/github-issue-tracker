import { IGithubIssue } from '../../../api/issues';
import { IssueActionType } from '../../actions/issues';

export interface IIssueState {
  list: IGithubIssue[];
  loading: Boolean;
  error?: Error;
  organizationSlug: string;
  repoSlug: string;
  filters: IIsueFilter[];
  sortCriteria: IIssueSortCriteria[];
}

export interface IIssueAction {
  type: IssueActionType;
  payload?: IGithubIssue[] | string | Error;
}

export interface IIsueFilter {
  id: string;
  label: string;
  isActive: boolean;
}

export interface IIssueSortCriteria {
  id: string;
  label: string;
  isActive: boolean;
}
