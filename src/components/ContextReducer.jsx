import React, { useReducer, useContext, createContext } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            // Check if item already exists with the same size
            const existingItem = state.find(
                (item) => item.id === action.id && item.size === action.size
            );
            if (existingItem) {
                return state.map((item) =>
                    item.id === action.id && item.size === action.size
                        ? {
                            ...item,
                            qty: item.qty + action.qty,
                            price: item.price + action.price,
                        }
                        : item
                );
            }
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    qty: action.qty,
                    size: action.size,
                    price: action.price,
                    img: action.img,
                },
            ];

        case "REMOVE":
            return state.filter((_, index) => index !== action.index);

        case "DROP":
            return []; // Clear the cart

        case "UPDATE":
            return state.map((item) =>
                item.id === action.id && item.size === action.size
                    ? {
                        ...item,
                        qty: item.qty + action.qty,
                        price: item.price + action.price,
                    }
                    : item
            );

        default:
            console.error("Error: Unknown action type in reducer.");
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
