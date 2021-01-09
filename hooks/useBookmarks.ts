import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../redux';
import * as bokmarkActions from '../redux/actions/bookmarks';
import { useBookmarksReturnValue } from '../types/bookmarks';

export default function useBookmarks(): useBookmarksReturnValue {
  const { bookmarks, loading } = useSelector((state: ApplicationState) => state.bookmarksReducer);

  const dispatch = useDispatch();

  const getBookmarks = () => {
    dispatch(bokmarkActions.getBookmarks());
  };

  return {
    data: {
      bookmarks,
      loading,
    },
    actions: {
      getBookmarks,
    },
  };
}
