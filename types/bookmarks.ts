import { IGithubIssue } from './issues';

export interface IBookmarkState {
  list: IGithubIssue[];
  loading: Boolean;
  error?: Error;
}

export interface IBookmarkAction {
  type: BookmarkActionType;
  payload?: IGithubIssue[] | IGithubIssue | string | Error;
}

export enum BookmarkActionType {
  GET_BOOKMARKS_PENDING = 'GET_BOOKMARKS_PENDING',
  GET_BOOKMARKS_SUCCESS = 'GET_BOOKMARKS_SUCCESS',
  GET_BOOKMARKS_ERROR = 'GET_BOOKMARKS_ERROR',

  ADD_BOOKMARK_PENDING = 'ADD_BOOKMARK_PENDING',
  ADD_BOOKMARK_SUCCESS = 'ADD_BOOKMARK_SUCCESS',
  ADD_BOOKMARK_ERROR = 'ADD_BOOKMARK_ERROR',

  REMOVE_BOOKMARK_PENDING = 'REMOVE_BOOKMARK_PENDING',
  REMOVE_BOOKMARK_SUCCESS = 'REMOVE_BOOKMARK_SUCCESS',
  REMOVE_BOOKMARK_ERROR = 'REMOVE_BOOKMARK_ERROR',
}
