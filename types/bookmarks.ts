import { GithubIssue } from "./issues";

export interface BookmarkState {
  bookmarks: GithubIssue[];
  loading: Boolean;
  error?: Error;
}

export interface BookmarkAction {
  type: BookmarkActionType;
  payload?: GithubIssue[] | GithubIssue | number | Error;
}

export enum BookmarkActionType {
  GET_BOOKMARKS_PENDING = "GET_BOOKMARKS_PENDING",
  GET_BOOKMARKS_SUCCESS = "GET_BOOKMARKS_SUCCESS",
  GET_BOOKMARKS_ERROR = "GET_BOOKMARKS_ERROR",

  ADD_BOOKMARK_PENDING = "ADD_BOOKMARK_PENDING",
  ADD_BOOKMARK_SUCCESS = "ADD_BOOKMARK_SUCCESS",
  ADD_BOOKMARK_ERROR = "ADD_BOOKMARK_ERROR",

  REMOVE_BOOKMARK_PENDING = "REMOVE_BOOKMARK_PENDING",
  REMOVE_BOOKMARK_SUCCESS = "REMOVE_BOOKMARK_SUCCESS",
  REMOVE_BOOKMARK_ERROR = "REMOVE_BOOKMARK_ERROR",
}
