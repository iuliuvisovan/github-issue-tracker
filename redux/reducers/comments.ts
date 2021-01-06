import { CommentActionType, CommentAction, CommentState, GithubComment } from '../../types/comments';

const initialState: CommentState = {
  list: [],
  loading: false,
};

export default (state: CommentState = initialState, action: CommentAction): CommentState => {
  switch (action.type) {
    // -- PENDINGS --
    case CommentActionType.GET_COMMENTS_PENDING:
      return { ...state, loading: true };

    // -- SUCCESSES --
    case CommentActionType.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        list: action.payload as GithubComment[],
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
