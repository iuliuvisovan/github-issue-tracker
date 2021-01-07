import { CommentAction, CommentActionType, CommentState } from '../../../types/comments';
import commentsReducer from './index';
import mockComments from '../../../mocks/comments';

const initialState: CommentState = {
  comments: [],
  loading: false,
};

describe('Comments Reducer', () => {
  it('handles GET_COMMENTS_PENDING', () => {
    const action: CommentAction = {
      type: CommentActionType.GET_COMMENTS_PENDING,
      payload: undefined,
    };

    const newState = commentsReducer(initialState, action);

    expect(newState).toEqual({
      comments: [],
      loading: true,
    });
  });
});
