export interface ICartItem {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
}

export interface ICartState {
    cartItems: ICartItem[];
    totalItems: number;
    totalPrice: number;
}

export enum CartActionTypes {
    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_FROM_CART = "REMOVE_FROM_CART",
    UPDATE_QUANTITY = "UPDATE_QUANTITY",
    CLEAR_CART = "CLEAR_CART",
}

export const addToCart = (item: Omit<ICartItem, "quantity">) => ({
    type: CartActionTypes.ADD_TO_CART as const,
    payload: item,
});

export const removeFromCart = (id: number) => ({
    type: CartActionTypes.REMOVE_FROM_CART as const,
    payload: id,
});

export const updateQuantity = (id: number, quantity: number) => ({
    type: CartActionTypes.UPDATE_QUANTITY as const,
    payload: { id, quantity },
});

export const clearCart = () => ({
    type: CartActionTypes.CLEAR_CART as const,
});

export type CartAction =
    | ReturnType<typeof addToCart>
    | ReturnType<typeof removeFromCart>
    | ReturnType<typeof updateQuantity>
    | ReturnType<typeof clearCart>;