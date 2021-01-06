import { Dispatch } from 'redux';
import { get } from '../../api/comments';
import { CommentAction, CommentActionType } from '../../types/comments';

export const getComments = (commentsUrl: string) => async (dispatch: Dispatch<CommentAction>) => {
  dispatch({ type: CommentActionType.GET_COMMENTS_PENDING });

  try {
    const comments = await get(commentsUrl);

    dispatch({ type: CommentActionType.GET_COMMENTS_SUCCESS, payload: comments });
  } catch (error) {
    dispatch({ type: CommentActionType.GET_COMMENTS_ERROR, payload: error });
  }
};
