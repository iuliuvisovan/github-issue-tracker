import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import issuesReducer from './reducers/issues';

const rootReducer = combineReducers({ issuesReducer });

export type IApplicationState = ReturnType<typeof rootReducer>;

export default createStore(rootReducer, applyMiddleware(thunk));
