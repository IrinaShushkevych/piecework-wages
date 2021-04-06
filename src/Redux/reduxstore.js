import {createStore, combineReducers, applyMiddleware} from 'redux';
import logUserReducer from './loguserreducer';
import dovidnukReducer from './dovidnukreducer';
import mainReducer from './mainreducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';

let reducers = combineReducers({loguser:logUserReducer, main:mainReducer, dovidnuk:dovidnukReducer, form:formReducer});
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;