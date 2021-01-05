import { IBookmarkState, BookmarkActionType, IBookmarkAction } from '../../types/bookmarks';
import { IGithubIssue } from '../../types/issues';

const initialState: IBookmarkState = {
  list: [],
  loading: false,
};

export default (state: IBookmarkState = initialState, action: IBookmarkAction): IBookmarkState => {
  switch (action.type) {
    // ---PENDINGS---
    case BookmarkActionType.GET_BOOKMARKS_PENDING:
      return { ...state, loading: true };
    case BookmarkActionType.ADD_BOOKMARK_PENDING:
      return { ...state, loading: true };
    case BookmarkActionType.REMOVE_BOOKMARK_PENDING:
      return { ...state, loading: true };

    // ---SUCCESSES---
    case BookmarkActionType.GET_BOOKMARKS_SUCCESS:
      return {
        ...state,
        list: action.payload as IGithubIssue[],
        loading: false,
        error: undefined,
      };

    case BookmarkActionType.ADD_BOOKMARK_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload as IGithubIssue],
        loading: false,
      };

    case BookmarkActionType.REMOVE_BOOKMARK_SUCCESS:
      return {
        ...state,
        list: [...state.list.filter((x) => x.id !== action.payload)],
        loading: false,
      };

    // ---ERRORS---
    case BookmarkActionType.GET_BOOKMARKS_ERROR:
      return { ...state, loading: false, error: action.payload as Error, list: [] };
    case BookmarkActionType.ADD_BOOKMARK_ERROR:
      return { ...state, loading: false, error: action.payload as Error, list: [] };
    case BookmarkActionType.REMOVE_BOOKMARK_ERROR:
      return { ...state, loading: false, error: action.payload as Error, list: [] };

    default:
      return state;
  }
};
