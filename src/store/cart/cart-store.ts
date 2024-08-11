
import { ICartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
    cart: ICartProduct[];

    addProductToCart: (product: ICartProduct) => void;
    //updateProductCartQuantity
    //removeProductFromCart
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],
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
            }
        }),
        {
            name: 'shopping-cart',
        }
    )
)

