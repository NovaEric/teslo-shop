
import { ICartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
    cart: ICartProduct[];

    getTotalItems: () => number;
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        getTotalItems: () => number;
    };

    addProductToCart: (product: ICartProduct) => void;
    updateProductCartQuantity: (product: ICartProduct, qty: number) => void;
    removeProductFromCart: (product: ICartProduct) => void;
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            //Methods
            getTotalItems: () => {

                const {cart} = get();

                return cart.reduce((total, item) => total + item.quantity, 0 );
            },

            addProductToCart: (product: ICartProduct) => {

                const { cart } = get();

                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.sizes === product.sizes)
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                const updatedCartProducts = cart.map((item) => {

                    if (item.id === product.id && item.sizes === product.sizes) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }
                    return item;
                });

                set({ cart: updatedCartProducts });
            },

            updateProductCartQuantity: (product: ICartProduct, qty: number) => {

                const {cart} = get();

                const updatedCartProduct = cart.map( item => {
                    
                    if (item.id === product.id && item.sizes === product.sizes) {
                        return { ...item, quantity: qty }
                    }
                    return item;
                });

                set({ cart: updatedCartProduct });

            },

            removeProductFromCart: (product: ICartProduct) => {

                const {cart} = get();
                
                const filterCartProducts = cart.filter( item => item.id !== product.id || item.sizes !== product.sizes );
                
                set({ cart: filterCartProducts });
            },
            
            getSummaryInformation: () => {
                
                const {cart, getTotalItems} = get();

                const subTotal = cart.reduce(
                  (subtotal, product) => product.price * product.quantity + subtotal, 0 
                );

                const tax = subTotal * 0.15;
                const total = subTotal + tax;

                return {
                    subTotal,
                    tax,
                    total,
                    getTotalItems
                };
            },
        }),
        {
            name: 'shopping-cart',
        }
    )
)

