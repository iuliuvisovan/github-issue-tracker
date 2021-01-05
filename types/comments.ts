import { IGithubUser } from './issues';

export interface IGithubComment {
  id: IGithubUser;
  user: IGithubUser;
  body: string;
  created_at: string;
}

export interface ICommentAction {
  type: CommentActionType;
  payload?: IGithubComment[] | Error;
}

export interface ICommentState {
  commentList: IGithubComment[];
  loading: Boolean;
  error?: Error;
}

export enum CommentActionType {
  GET_COMMENTS_PENDING = 'GET_COMMENTS_PENDING',
  GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS',
  GET_COMMENTS_ERROR = 'GET_COMMENTS_ERROR',
}

export interface ICommentProps {
  comment: IGithubComment;
}
