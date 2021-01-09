import { StackNavigationProp } from '@react-navigation/stack';
import { RefObject } from 'react';
import { FlatList } from 'react-native';
import { Comment } from './comments';
import { RootStackParamList as RootStackParams } from './navigation';

export interface Issue {
  url: string;
  id: number;
  number: string;
  title: string;
  body: string;
  user: IssueUser;
  labels: IssueLabel[];
  created_at: string;
  state: 'open' | 'closed';
  comments_url: string;
  pull_request?: object;
  isBookmarked?: boolean;
}

export interface IssueUser {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  html_url: string;
}

export interface IssueLabel {
  id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string;
}

export interface GetIssuesParams {
  organizationId: string;
  repoId: string;
  filter: string;
  sort: string;
  page: number;
}

export interface IssueItemProps {
  issue: Issue;
  navigation: StackNavigationProp<RootStackParams>;
}

export interface IssueHeaderProps {
  issue: Issue;
}

export interface IssueState {
  issues: Issue[];
  loading: boolean;
  error?: Error;
  organizationId: string;
  repoId: string;
  filters: IssueFilter[];
  sortCriteria: IssueSortCriterion[];
  currentPage: number;
}

export interface IssueAction {
  type: IssueActionType;
  payload?: Issue[] | Comment[] | string | number | Error;
}

export interface IssueFilter {
  id: string;
  label: string;
  isActive: boolean;
}

export interface IssueSortCriterion {
  id: string;
  label: string;
  isActive: boolean;
}

export enum IssueActionType {
  GET_ISSUES_PENDING = 'GET_ISSUES_PENDING',
  GET_ISSUES_SUCCESS = 'GET_ISSUES_SUCCESS',
  GET_ISSUES_ERROR = 'GET_ISSUES_ERROR',
  COMMIT_ORGANIZATION_ID = 'COMMIT_ORGANIZATION_ID',
  COMMIT_REPO_ID = 'COMMIT_REPO_ID',
  TOGGLE_FILTER = 'TOGGLE_FILTER',
  SET_SORT_CRITERION = 'SET_SORT_CRITERION',
  SET_PAGE = 'SET_PAGE',
}

export interface useIssuesReturnValue {
  data: {
    issues: Issue[];
    loading: boolean;
    filters: IssueFilter[];
    sortCriteria: IssueSortCriterion[];
    currentPage: number;
    error?: Error;
  };
  actions: {
    getIssues: () => void;
    toggleFilter: (filterId: string) => void;
    setSortCriterion: (sortCriterionId: string) => void;
    setPage: (pageNumber: number) => void;
  };
}
