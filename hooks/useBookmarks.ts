import { useDispatch, useSelector } from 'react-redux';
import { IApplicationState } from '../redux';
import * as issueActions from '../redux/actions/issues';
import { useBookmarksReturnValue } from '../types/bookmarks';

export default function useBookmarks(): useBookmarksReturnValue {
  const { bookmarks, loading } = useSelector((state: IApplicationState) => state.bookmarksReducer);

  const dispatch = useDispatch();

  const getBookmarks = () => {
    dispatch(issueActions.getIssues());
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
