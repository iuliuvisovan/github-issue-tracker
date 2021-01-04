import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import issues from './reducers/issues';

export default createStore(combineReducers({ issues }), applyMiddleware(thunk));
