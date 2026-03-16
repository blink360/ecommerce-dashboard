import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { cartReducer, initialState } from "src/contexts/CartContext/reducer";
import { CartAction, ICartState } from "src/contexts/CartContext/actions";
import { getItemFromLocalStorage, storeItemInLocalStorage } from "src/utils/storage";

interface ICartContext {
    state: ICartState;
    dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<ICartContext | null>(null);

const loadFromLocalStorage = (): ICartState => {
    try {
        const retrievedValue = getItemFromLocalStorage("cart");
        return retrievedValue ? retrievedValue : initialState;
    } catch {
        return initialState;
    }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, loadFromLocalStorage());

    useEffect(() => {
        storeItemInLocalStorage('cart', state)
    }, [state]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;