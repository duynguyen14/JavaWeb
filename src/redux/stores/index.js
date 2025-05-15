import { createStore, combineReducers } from 'redux';
import loadingReducers from '../reducers/loadingReducer';

const rootReducer = combineReducers({
    loading: loadingReducers,
    // thêm reducer khác nếu có
});

const store = createStore(rootReducer);

export default store;