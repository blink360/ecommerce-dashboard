import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { authReducer, initialState } from "src/contexts/AuthContext/reducer";
import { AuthAction, IAuthState } from "src/contexts/AuthContext/actions";

interface IAuthContext {
    state: IAuthState;
    dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<IAuthContext | null>(null);

const loadFromLocalStorage = (): IAuthState => {
    try {
        const stored = localStorage.getItem("auth");
        return stored ? JSON.parse(stored) : initialState;
    } catch {
        return initialState;
    }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, loadFromLocalStorage());

    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(state));
    }, [state]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;