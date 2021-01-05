import { CommentActionType, ICommentAction, ICommentState, IGithubComment } from '../../types/comments';

const initialState: ICommentState = {
  commentList: [],
  loading: false,
};

export default (state: ICommentState = initialState, action: ICommentAction): ICommentState => {
  switch (action.type) {
    // -- PENDINGS --
    case CommentActionType.GET_COMMENTS_PENDING:
      return { ...state, loading: true };

    // -- SUCCESSES --
    case CommentActionType.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        commentList: action.payload as IGithubComment[],
        loading: false,
        error: undefined,
      };

    // -- ERRORS --
    case CommentActionType.GET_COMMENTS_ERROR:
      return { ...state, loading: false, error: action.payload as Error };

    default:
      return state;
  }
};
