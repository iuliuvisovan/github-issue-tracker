import { StackScreenProps } from '@react-navigation/stack';
import { Issue } from './issues';

export type RootStackParamList = {
  Root: undefined;
  IssueDetails: {
    issue: Issue;
  };
};

export type BottomTabParamList = {
  Issues: undefined;
  Bookmarks: undefined;
};

export type IssuesStackParamList = {
  Issues: undefined;
};

export type BookmarksStackParamList = {
  Bookmarks: undefined;
};

export type IssueDetailsScreenProps = StackScreenProps<RootStackParamList, 'IssueDetails'>;

export type IssuesScreenProps = StackScreenProps<RootStackParamList>;

export type BookmarksScreenProps = StackScreenProps<RootStackParamList>;
