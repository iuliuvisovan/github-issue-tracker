import { IssueUser } from './issues';

export interface Comment {
  id: number;
  user: IssueUser;
  body: string;
  created_at: string;
}

export interface CommentAction {
  type: CommentActionType;
  payload?: Comment[] | Error;
}

export interface CommentState {
  comments: Comment[];
  loading: boolean;
  error?: Error;
}

export enum CommentActionType {
  GET_COMMENTS_PENDING = 'GET_COMMENTS_PENDING',
  GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS',
  GET_COMMENTS_ERROR = 'GET_COMMENTS_ERROR',
}

export interface CommentProps {
  comment: Comment;
}
