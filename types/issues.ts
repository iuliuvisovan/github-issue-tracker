import { StackNavigationProp } from '@react-navigation/stack';
import { RefObject } from 'react';
import { FlatList } from 'react-native';
import { GithubComment } from './comments';
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
  navigation: StackNavigationProp<RootStackParams, 'IssueDetails'>;
}

export interface IssueHeaderProps {
  issue: Issue;
}

export interface IssueState {
  issues: Issue[];
  loading: Boolean;
  error?: Error;
  organizationId: string;
  repoId: string;
  filters: IssueFilter[];
  sortCriteria: IssueSortCriteria[];
  currentPage: number;
}

export interface IssueAction {
  type: IssueActionType;
  payload?: Issue[] | GithubComment[] | string | number | Error;
}

export interface IssueFilter {
  id: string;
  label: string;
  isActive: boolean;
}

export interface IssueSortCriteria {
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

export interface CurrentPageHookReturnValue {
  data: {
    organizationId: string;
    repoId: string;
    isPickerOpen: boolean;
    isScrolled: boolean;
    flatListRef: RefObject<FlatList<Issue>>;
    error?: Error;
  };
  actions: {
    setOrganizationId: (id: string) => void;
    setRepoId: (id: string) => void;
    pickSortCriterion: (sortCriteria: IssueSortCriteria[]) => Promise<string>;
    setIsPickerOpen: (value: boolean) => void;
    setIsScrolled: (value: boolean) => void;
  };
}
