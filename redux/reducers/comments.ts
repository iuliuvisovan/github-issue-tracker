import { CommentActionType, ICommentAction, ICommentState, IGithubComment } from '../../types/comments';

const initialState: ICommentState = {
  list: [],
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
        list: action.payload as IGithubComment[],
        loading: false,
        error: undefined,
      };

    // -- ERRORS --
    case CommentActionType.GET_COMMENTS_ERROR:
      return { ...state, loading: false, error: action.payload as Error, list: [] };

    default:
      return state;
  }
};
