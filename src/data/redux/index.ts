import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import issuesReducer from './reducers/issues';
import commentsReducer from './reducers/comments';
import bookmarksReducer from './reducers/bookmarks';

const rootReducer = combineReducers({ issuesReducer, commentsReducer, bookmarksReducer });

export type ApplicationState = ReturnType<typeof rootReducer>;

export default createStore(rootReducer, applyMiddleware(thunk));
