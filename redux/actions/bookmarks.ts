import { Dispatch } from 'redux';
import { BookmarkActionType, IBookmarkAction } from '../../types/bookmarks';
import AsyncStorage from '@react-native-community/async-storage';
import { IGithubIssue } from '../../types/issues';

export const getBookmarks = () => async (dispatch: Dispatch<IBookmarkAction>) => {
  dispatch({ type: BookmarkActionType.GET_BOOKMARKS_PENDING });

  try {
    const bookmarksJson = await AsyncStorage.getItem('bookmarks');

    let bookmarks = [];
    if (bookmarksJson) {
      bookmarks = JSON.parse(bookmarksJson);
    }

    dispatch({ type: BookmarkActionType.GET_BOOKMARKS_SUCCESS, payload: bookmarks });
  } catch (error) {
    dispatch({ type: BookmarkActionType.GET_BOOKMARKS_ERROR, payload: error });
  }
};

export const addBookmark = (issue: IGithubIssue) => async (dispatch: Dispatch<IBookmarkAction>) => {
  dispatch({ type: BookmarkActionType.ADD_BOOKMARK_PENDING });

  try {
    const bookmarksJson = await AsyncStorage.getItem('bookmarks');

    let bookmarks: IGithubIssue[] = [];
    if (bookmarksJson) {
      bookmarks = JSON.parse(bookmarksJson) as IGithubIssue[];
    }

    bookmarks.push(issue);

    await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } catch (error) {
    dispatch({ type: BookmarkActionType.ADD_BOOKMARK_ERROR, payload: error });
  }
};
