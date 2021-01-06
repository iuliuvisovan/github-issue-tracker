import { StackScreenProps } from "@react-navigation/stack";
import { GithubIssue } from "./issues";

export type RootStackParamList = {
  Root: undefined;
  IssueDetails: {
    issue: GithubIssue;
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

export type IssueDetailsScreenProps = StackScreenProps<RootStackParamList, "IssueDetails">;

export type IssuesScreenProps = StackScreenProps<IssuesStackParamList, "Issues">;

export type BookmarksScreenProps = StackScreenProps<BookmarksStackParamList, "Bookmarks">;
