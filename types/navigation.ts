import { StackScreenProps } from '@react-navigation/stack';
import { IGithubIssue } from './issues';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type IBottomTabParamList = {
  Issues: undefined;
  Bookmarks: undefined;
};

export type IIssuesStackParamList = {
  Issues: undefined;
  IssueDetails: {
    issue: IGithubIssue;
  };
};

export type IBookmarksStackParamList = {
  BookmarksScreen: undefined;
};

export type IIssuesScreenProps = StackScreenProps<IIssuesStackParamList, 'Issues'>;
export type IIssueDetailsScreenProps = StackScreenProps<IIssuesStackParamList, 'IssueDetails'>;
