import { BookmarkState, BookmarkActionType, BookmarkAction } from '../../types/bookmarks';
import { Issue } from '../../types/issues';

const initialState: BookmarkState = {
  bookmarks: [],
  loading: false,
};

export default (state: BookmarkState = initialState, action: BookmarkAction): BookmarkState => {
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
        bookmarks: action.payload as Issue[],
        loading: false,
        error: undefined,
      };

    case BookmarkActionType.ADD_BOOKMARK_SUCCESS:
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload as Issue],
        loading: false,
      };

    case BookmarkActionType.REMOVE_BOOKMARK_SUCCESS:
      return {
        ...state,
        bookmarks: [...state.bookmarks.filter((x) => x.id !== action.payload)],
        loading: false,
      };

    // ---ERRORS---
    case BookmarkActionType.GET_BOOKMARKS_ERROR:
      return { ...state, loading: false, error: action.payload as Error, bookmarks: [] };
    case BookmarkActionType.ADD_BOOKMARK_ERROR:
      return { ...state, loading: false, error: action.payload as Error, bookmarks: [] };
    case BookmarkActionType.REMOVE_BOOKMARK_ERROR:
      return { ...state, loading: false, error: action.payload as Error, bookmarks: [] };

    default:
      return state;
  }
};
