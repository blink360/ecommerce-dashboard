export interface IAuthState {
    token: string | null;
    isLoggedIn: boolean;
    username: string | null;
}

export enum AuthActionTypes {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}

export const login = (token: string, username: string) => ({
    type: AuthActionTypes.LOGIN as const,
    payload: { token, username },
});

export const logout = () => ({
    type: AuthActionTypes.LOGOUT as const,
});

export type AuthAction =
    | ReturnType<typeof login>
    | ReturnType<typeof logout>;