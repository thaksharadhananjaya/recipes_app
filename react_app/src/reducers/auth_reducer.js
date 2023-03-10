import { authActionsType } from "../actions/action_types";

const initState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        username: ''
    },
    authenticate: false,
    authenticating: false,
    logOuting: false,
    error: null,
    message: ''
};

const authReducer = (state = initState, action) => {
   
    switch (action.type) {
        case authActionsType.REQUEST_LOGIN:
            state = {
                ...state,
                authenticating: true
            };
            break;

        case authActionsType.LOGIN_SUCCESS:
            state = {
                ...state,
                ...action.payload,
                authenticating: false,
                authenticate: true
            };
            break;

        case authActionsType.LOGIN_FAILURE:
            state = {
                ...initState,
                error: action.payload.error,
            }
            break;
        case authActionsType.REQUEST_SIGNUP:
            state = {
                ...state,
                authenticating: true
            };
            break;
        case authActionsType.SIGNUP_FAILURE:
            state = {
                ...initState,
                error: action.payload.error,
            }
            break;
        case authActionsType.REQUEST_LOGOUT:
            state = {
                ...state,
                logOuting: true
            }
            break;
        case authActionsType.LOGOUT_SUCCESS:
            state = initState;
            break;
        case authActionsType.LOGOUT_FAILURE:
            state = {
                ...state,
                logOuting: false,
                error: action.payload.error
            };
            break;

        default:
    }
    return state;
}

export default authReducer;