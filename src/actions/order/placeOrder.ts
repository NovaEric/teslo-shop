'use server'

import { auth } from "@/auth.config";
import { IAddress, Size } from "@/interfaces";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size;
}

export const placeOrder = async(productIds: ProductToOrder[], address: IAddress ) => {

    const session = await auth();

    const userId = session?.user.id;

    if (!userId) {
        return {
            ok: false,
            message: 'No user session'
        }
    }

    console.log({ productIds, address, userId } )

}