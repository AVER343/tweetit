import Error_Reducer from './error/error.reducers';
import ProfileReducer from './profile/profile.reducers';
import Success_Reducer from './success/sucess.reducers';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './users/users.reducers';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','profile']
};

const rootReducer = combineReducers({
  user: userReducer,
  errors:Error_Reducer,
  profile:ProfileReducer,
  success:Success_Reducer
});

export default persistReducer(persistConfig, rootReducer);