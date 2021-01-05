import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import issuesReducer from './reducers/issues';
import commentsReducer from './reducers/comments';

const rootReducer = combineReducers({ issuesReducer, commentsReducer });

export type IApplicationState = ReturnType<typeof rootReducer>;

export default createStore(rootReducer, applyMiddleware(thunk));
