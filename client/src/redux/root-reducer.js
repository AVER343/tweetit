import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import Error_Reducer from './error/error.reducers';
import userReducer from './users/users.reducers';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  user: userReducer,
  errors:Error_Reducer
});

export default persistReducer(persistConfig, rootReducer);