import { recipeActionsType } from "./action_types";
import axiosInstance from "../helpers/axios";

export const getAllRecipes = () => {
    return async (dispatch) => {
        dispatch({ type: recipeActionsType.REQUEST_RECIPES });
        try {
            const response = await axiosInstance.get('recipes');
            if ((response).status === 200) {
                //console.log(response.data)
                dispatch(
                    {
                        type: recipeActionsType.LOAD_RECIPES_SUCCESS,
                        payload: response.data
                    }
                )
            } else {
                dispatch(
                    {
                        type: recipeActionsType.LOAD_RECIPES_FAIL,
                        payload: {
                            error: 'Something went to wrong!'
                        }
                    }
                );
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: recipeActionsType.LOAD_RECIPES_FAIL,
                payload: {
                    error: 'Something went to wrong!'
                }
            })
        }
    }
}

export const setRecipe = (recipe) => {
    return async (dispatch) => {
        dispatch({
            type: recipeActionsType.LOAD_RECIPE_SUCCESS,
            payload: { viewRecipe: recipe }
        });

    }
}

export const getRecipe = (id) => {
    console.log('k');
    return async (dispatch) => {
        dispatch({ type: recipeActionsType.REQUEST_RECIPE });
        try {
            const response = await axiosInstance.get(`recipe/${id}`);
            if ((response).status === 200) {
                //console.log(response.data)
                dispatch(
                    {
                        type: recipeActionsType.LOAD_RECIPE_SUCCESS,
                        payload: {viewRecipe:response.data}
                    }
                )
            } else {
                dispatch(
                    {
                        type: recipeActionsType.LOAD_RECIPE_FAIL,
                        payload: {
                            error: 'Something went to wrong!'
                        }
                    }
                );
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: recipeActionsType.LOAD_RECIPE_FAIL,
                payload: {
                    error: 'Something went to wrong!'
                }
            })
        }
    }
}

export const addRecipe = (recipe) => {
    return async (dispatch) => {
        dispatch({ type: recipeActionsType.REQUEST_ADD_RECIPE });
        try {
            const response = await axiosInstance.post('recipe', recipe);
            if ((response).status === 201) {
                dispatch(
                    {
                        type: recipeActionsType.ADD_RECIPE_SUCCESS,
                    }
                )
                dispatch(getAllRecipes());
            } else {
                dispatch(
                    {
                        type: recipeActionsType.ADD_RECIPE_FAIL,
                        payload: {
                            error: 'Something went to wrong!'
                        }
                    }
                );
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: recipeActionsType.ADD_RECIPE_FAIL,
                payload: {
                    error: 'Something went to wrong!'
                }
            })
        }
    }
}

export const updateRecipe = (recipe, id) => {
    console.log(id)
    return async (dispatch) => {
        dispatch({ type: recipeActionsType.REQUEST_RECIPE_UPDATE });
        try {
            const response = await axiosInstance.put(`recipe/${id}`, recipe);
            if ((response).status === 200) {
                dispatch(
                    {
                        type: recipeActionsType.UPDATE_RECIPE_SUCCESS,
                    }
                )
                dispatch(getRecipe(id));
            } else {
                console.log(response.data)
                dispatch(
                    {
                        type: recipeActionsType.UPDATE_RECIPE_FAIL,
                        payload: {
                            error: 'Something went to wrong!'
                        }
                    }
                );
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: recipeActionsType.UPDATE_RECIPE_FAIL,
                payload: {
                    error: 'Something went to wrong!'
                }
            })
        }
    }
}

export const deleteRecipe = (id) => {
    return async (dispatch) => {
        dispatch({ type: recipeActionsType.REQUEST_RECIPE_DELETE });
        try {
            const response = await axiosInstance.delete(`recipe/${id}`);
            if ((response).status === 200) {
                //console.log(response.data)
                dispatch(
                    {
                        type: recipeActionsType.DELETE_RECIPE_SUCCESS,
                    }
                )
            } else {
                dispatch(
                    {
                        type: recipeActionsType.DELETE_RECIPE_FAIL,
                        payload: {
                            error: 'Something went to wrong!'
                        }
                    }
                );
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: recipeActionsType.DELETE_RECIPE_FAIL,
                payload: {
                    error: 'Something went to wrong!'
                }
            })
        }
    }
}
