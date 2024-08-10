
import { ICartProduct } from "@/interfaces";
import { create } from "zustand";


interface State {
    cart: ICartProduct[];

    //addProductToCart
    //updateProductCartQuantity
    //removeProductFromCart
}

export const useCartStore = create<State>()(
    (set) => ({
        cart: []
    })
)

