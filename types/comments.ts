import { IssueUser } from "./issues";

export interface GithubComment {
  id: IssueUser;
  user: IssueUser;
  body: string;
  created_at: string;
}

export interface CommentAction {
  type: CommentActionType;
  payload?: GithubComment[] | Error;
}

export interface CommentState {
  list: GithubComment[];
  loading: Boolean;
  error?: Error;
}

export enum CommentActionType {
  GET_COMMENTS_PENDING = "GET_COMMENTS_PENDING",
  GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS",
  GET_COMMENTS_ERROR = "GET_COMMENTS_ERROR",
}

export interface CommentProps {
  comment: GithubComment;
}
