import { StackScreenProps } from '@react-navigation/stack';
import { IGithubIssue } from './issues';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  IssueDetails: {
    issue: IGithubIssue;
  };
};

export type IBottomTabParamList = {
  Issues: undefined;
  Bookmarks: undefined;
};

export type IIssuesStackParamList = {
  Issues: undefined;
};

export type IBookmarksStackParamList = {
  Bookmarks: undefined;
};

export type IIssuesScreenProps = StackScreenProps<IIssuesStackParamList, 'Issues'>;
export type IIssueDetailsScreenProps = StackScreenProps<RootStackParamList, 'IssueDetails'>;

export type IBookmarksScreenProps = StackScreenProps<IBookmarksStackParamList, 'Bookmarks'>;
