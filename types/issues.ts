import { StackNavigationProp } from '@react-navigation/stack';
import { IIssuesStackParamList } from './navigation';

export interface IGetIssuesParams {
  organizationId: string;
  repoId: string;
  filter: string;
  sort: string;
  page: number;
}

export interface IGithubUser {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  html_url: string;
}

export interface IGithubIssueLabel {
  id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

export interface IGithubIssue {
  url: string;
  id: number;
  number: string;
  title: string;
  body: string;
  user: IGithubUser;
  labels: IGithubIssueLabel[];
  created_at: string;
  state: 'open' | 'closed';
  comments_url: string;
  pull_request?: object;
  isBookmarked?: boolean;
}

export interface IIssueItemProps {
  issue: IGithubIssue;
  navigation: StackNavigationProp<IIssuesStackParamList, 'Issues'>;
}

export interface IIssueHeaderProps {
  issue: IGithubIssue;
}

export interface IIssueDetailsProps {
  issue: IGithubIssue;
  navigation: StackNavigationProp<IIssuesStackParamList, 'IssueDetails'>;
}

export interface IIssueState {
  list: IGithubIssue[];
  loading: Boolean;
  error?: Error;
  organizationId: string;
  repoId: string;
  filters: IIsueFilter[];
  sortCriteria: IIssueSortCriteria[];
  currentPage: number;
}

export interface IIssueAction {
  type: IssueActionType;
  payload?: IGithubIssue[] | IGithubComment[] | string | number | Error;
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

export enum IssueActionType {
  GET_ISSUES_PENDING = 'GET_ISSUES_PENDING',
  GET_ISSUES_SUCCESS = 'GET_ISSUES_SUCCESS',
  GET_ISSUES_ERROR = 'GET_ISSUES_ERROR',
  SET_ORGANIZATION_SLUG = 'SET_ORGANIZATION_SLUG',
  SET_REPO_SLUG = 'SET_REPO_SLUG',
  TOGGLE_FILTER = 'TOGGLE_FILTER',
  SET_SORT_CRITERION = 'SET_SORT_CRITERION',
  SET_PAGE = 'SET_PAGE',
}
