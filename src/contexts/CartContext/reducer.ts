import { CartActionTypes, ICartState, CartAction } from "src/contexts/CartContext/actions";

export const initialState: ICartState = {
    cartItems: [],
    totalItems: 0,
    totalPrice: 0,
};

const calculateTotal = (cartItems: ICartState["cartItems"]): Pick<ICartState, "totalItems" | "totalPrice"> => ({
    totalItems: cartItems.reduce((sum, i) => sum + i.quantity, 0),
    totalPrice: cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
});

const withTotals = (state: ICartState, cartItems: ICartState["cartItems"]): ICartState => ({
    ...state,
    cartItems,
    ...calculateTotal(cartItems),
});

export const cartReducer = (state: ICartState = initialState, action: CartAction): ICartState => {
    switch (action.type) {

        case CartActionTypes.ADD_TO_CART: {
            const exists = state.cartItems.find((i) => i.id === action.payload.id);
            return withTotals(state, exists
                ? state.cartItems.map((i) => i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i)
                : [...state.cartItems, { ...action.payload, quantity: 1 }]
            );
        }

        case CartActionTypes.REMOVE_FROM_CART:
            return withTotals(state, state.cartItems.filter((i) => i.id !== action.payload));

        case CartActionTypes.UPDATE_QUANTITY: {
            const { id, quantity } = action.payload;
            return withTotals(state, quantity <= 0
                ? state.cartItems.filter((i) => i.id !== id)
                : state.cartItems.map((i) => i.id === id ? { ...i, quantity } : i)
            );
        }

        case CartActionTypes.CLEAR_CART:
            return initialState;

        default:
            return state;
    }
};