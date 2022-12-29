import { recipeActionsType } from "../actions/action_types";

const initState = {
    viewRecipe: null,
    recipes: [{
        name: null,
        ingredients: null,
        description: null,
    }],
    loading: false,
    error: null
}

const recipeReducer = (state = initState, action) => {

    switch (action.type) {
        case recipeActionsType.REQUEST_RECIPES:
            state = {
                ...state,
                viewRecipe: null,
                loading: true
            };
            break;
        case recipeActionsType.LOAD_RECIPES_SUCCESS:
            state = {
                ...state,
                recipes: action.payload,
                loading: false
            };
            break;
        case recipeActionsType.LOAD_RECIPES_FAIL:
            state = {
                ...initState,
                ...action.payload,
                loading: false
            };
            break;
        case recipeActionsType.REQUEST_ADD_RECIPE:
            state = {
                ...state,
                loading: true
            };
            break;

        case recipeActionsType.ADD_RECIPE_SUCCESS:
            state = {
                ...state,
                loading: false
            };
            break;
        case recipeActionsType.ADD_RECIPES_FAIL:
            state = {
                ...state,
                loading: false
            };
            break;
        case recipeActionsType.REQUEST_RECIPE:
            state = {
                ...state,
                loading: true
            };
            break;
        case recipeActionsType.LOAD_RECIPE_SUCCESS:
            state = {
                ...state,
                ...action.payload,
                loading: false,
            };
            break;
        case recipeActionsType.ADD_RECIPE_FAIL:
            state = {
                ...state,
                loading: false
            };
            break;


        case recipeActionsType.REQUEST_RECIPE_UPDATE:
            state = {
                ...state,
                loading: true
            };
            break;

        case recipeActionsType.UPDATE_RECIPE_SUCCESS:
            state = {
                ...state,
                loading: false
            };
            break;
        case recipeActionsType.UPDATE_RECIPE_FAIL:
            state = {
                ...state,
                loading: false,
                viewRecipe:'deleted'
            };
            break;

        case recipeActionsType.REQUEST_RECIPE_DELETE:
            state = {
                ...state,
                loading: true
            };
            break;

        case recipeActionsType.DELETE_RECIPE_SUCCESS:
            state = {
                ...state,
                loading: false,
                viewRecipe:'deleted'
            };
            break;
        case recipeActionsType.DELETE_RECIPE_FAIL:
            state = {
                ...state,
                loading: false
            };
            break;
        default:
    }
    return state;
}

export default recipeReducer;