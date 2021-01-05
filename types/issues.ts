import { StackNavigationProp } from '@react-navigation/stack';
import { IIssuesStackParamList } from './navigation';

export interface IGetIssuesParams {
  organizationSlug: string;
  repoSlug: string;
  filter: string;
  sort: string;
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
  id: string;
  number: string;
  title: string;
  user: IGithubUser;
  labels: IGithubIssueLabel[];
  created_at: string;
  state: 'open' | 'closed';
  comments_url: string;
  pull_request?: any;
}

export interface IGithubIssueComment {
  user: IGithubUser;
  body: string;
  created_at: string;
}

export interface IIssueItemProps {
  issue: IGithubIssue;
  navigation: StackNavigationProp<IIssuesStackParamList, 'Issues'>;
}

export interface IIssueDetailsProps {
  issue: IGithubIssue;
  navigation: StackNavigationProp<IIssuesStackParamList, 'IssueDetails'>;
}
