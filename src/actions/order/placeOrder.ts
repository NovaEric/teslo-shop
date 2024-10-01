'use server'

import { auth } from "@/auth.config";
import { IAddress, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

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

    // Get products information
    // PD: We can not have 2 products with the same ID

    const products = await prisma.product.findMany({
        where:{
            id: {
                in: productIds.map(p => p.productId)
            }
        }
    });

    // Calculate amount
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity , 0);

}