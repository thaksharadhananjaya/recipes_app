import { authActionsType } from "./action_types"
import axiosInstance from "../helpers/axios"
import { getAllRecipes } from "./recipes_action";

export const login = (user) => {
    //console.log(user);

    return async (dispatch) => {
        dispatch({
            type: authActionsType.REQUEST_LOGIN,
        });

        try {
            const response = await axiosInstance.post('signin', user);
            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: authActionsType.LOGIN_SUCCESS,
                    payload: {
                        token,
                        user
                    }
                });
            } else {
                dispatch({
                    type: authActionsType.LOGIN_FAILURE,
                    payload: {
                        error: 'Failed to login'
                    }
                });
            }
        }
        catch (error) {
            dispatch({
                type: authActionsType.LOGIN_FAILURE,
                payload: {
                    error: 'Failed to login'
                }
            });
        }

    }
}

export const signup = (user) => {
    //console.log(user);

    return async (dispatch) => {
        dispatch({
            type: authActionsType.REQUEST_SIGNUP,
        });

        try {
            const response = await axiosInstance.post('signup', user);
            if (response.status === 200) {
                const { token, user } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({
                    type: authActionsType.LOGIN_SUCCESS,
                    payload: {
                        token,
                        user
                    }
                });
                dispatch(getAllRecipes());
            } else {
                dispatch({
                    type: authActionsType.SIGNUP_FAILURE,
                    payload: {
                        error: 'Failed to login'
                    }
                });
            }
        }
        catch (error) {
            dispatch({
                type: authActionsType.SIGNUP_FAILURE,
                payload: {
                    error: 'Failed to login'
                }
            });
        }

    }
}


export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authActionsType.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } else {
            dispatch({
                type: authActionsType.LOGOUT_SUCCESS,
                payload: { error: 'Failed to login' }
            });
        }
    }
}

export const logout = () => {
    return async dispatch => {
        /* dispatch({
            type: authActionsType.REQUEST_LOGOUT
        }); */
        window.localStorage.clear();
        dispatch({
            type: authActionsType.LOGOUT_SUCCESS
        });
        /* try{
            const response = await axiosInstance.post('signout');
            if(response.status===200){
                window.localStorage.clear();
                dispatch({
                    type: authActionsType.LOGOUT_SUCCESS
                });
            }else{
                dispatch({
                    type: authActionsType.LOGOUT_FAILURE,
                    payload:{error: 'Logout failed!'}
                });
            }
        }
        catch(error){
            dispatch({
                type: authActionsType.LOGOUT_FAILURE,
                payload:{error: 'Logout failed!'}
            });
        }  */
    }
}
