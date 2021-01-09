import { Dispatch } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BookmarkActionType, BookmarkAction } from '../../../types/bookmarks';
import { Issue } from '../../../types/issues';

export const getBookmarks = () => async (dispatch: Dispatch<BookmarkAction>) => {
  dispatch({ type: BookmarkActionType.GET_BOOKMARKS_PENDING });

  try {
    let bookmarks: Issue[] = [];

    const bookmarksJson = await AsyncStorage.getItem('bookmarks');
    if (bookmarksJson) {
      bookmarks = JSON.parse(bookmarksJson) as Issue[];
    }

    dispatch({ type: BookmarkActionType.GET_BOOKMARKS_SUCCESS, payload: bookmarks });
  } catch (error) {
    dispatch({ type: BookmarkActionType.GET_BOOKMARKS_ERROR, payload: error });
  }
};

export const addBookmark = (issue: Issue) => async (dispatch: Dispatch<BookmarkAction>) => {
  dispatch({ type: BookmarkActionType.ADD_BOOKMARK_PENDING });

  try {
    dispatch({ type: BookmarkActionType.ADD_BOOKMARK_SUCCESS, payload: issue });

    let bookmarks: Issue[] = [];

    const bookmarksJson = await AsyncStorage.getItem('bookmarks');
    if (bookmarksJson) {
      bookmarks = JSON.parse(bookmarksJson) as Issue[];
    }

    bookmarks.push(issue);

    await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } catch (error) {
    dispatch({ type: BookmarkActionType.ADD_BOOKMARK_ERROR, payload: error });
  }
};

export const removeBookmark = (issueId: number) => async (dispatch: Dispatch<BookmarkAction>) => {
  dispatch({ type: BookmarkActionType.REMOVE_BOOKMARK_PENDING });

  try {
    dispatch({ type: BookmarkActionType.REMOVE_BOOKMARK_SUCCESS, payload: issueId });

    const bookmarksJson = await AsyncStorage.getItem('bookmarks');

    if (bookmarksJson) {
      const bookmarks = (JSON.parse(bookmarksJson) as Issue[]).filter((x) => x.id !== issueId);

      await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  } catch (error) {
    dispatch({ type: BookmarkActionType.REMOVE_BOOKMARK_ERROR, payload: error });
  }
};
