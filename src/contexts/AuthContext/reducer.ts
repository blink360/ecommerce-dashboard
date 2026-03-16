import { AuthActionTypes, IAuthState, AuthAction } from "src/contexts/AuthContext/actions";

export const initialState: IAuthState = {
    token: null,
    isLoggedIn: false,
    username: null,
};

export const authReducer = (state: IAuthState = initialState, action: AuthAction): IAuthState => {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return {
                token: action.payload.token,
                isLoggedIn: true,
                username: action.payload.username,
            };
        case AuthActionTypes.LOGOUT:
            return initialState;
        default:
            return state;
    }
};