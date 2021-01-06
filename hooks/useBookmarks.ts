import { useDispatch, useSelector } from "react-redux";
import { IApplicationState } from "../redux";
import * as issueActions from "../redux/actions/issues";

export default function useBookmarks() {
  const { bookmarks, loading } = useSelector((state: IApplicationState) => state.bookmarksReducer);

  const dispatch = useDispatch();

  const getBookmarks = () => {
    dispatch(issueActions.getIssues());
  };

  return {
    bookmarks,
    loading,
    getBookmarks,
  };
}
