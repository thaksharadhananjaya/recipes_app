import authReducer from './auth_reducer';
import recipeReducer from './recipes_reducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    recipes: recipeReducer
});

export default rootReducer;
