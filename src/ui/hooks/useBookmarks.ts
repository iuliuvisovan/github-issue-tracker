import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from '../../data/redux';
import * as bokmarkActions from '../../data/redux/actions/bookmarks';
import { useBookmarksReturnValue } from '../../data/types/bookmarks';

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
