//import { imagesReducer } from './Reducers/reducers';

import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { imagesReducer } from './Reducers/reducers';

const rootReducer = combineReducers({
  imagesReducer: imagesReducer,
});

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware)),
);
