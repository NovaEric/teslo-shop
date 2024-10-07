'use server'

import { auth } from "@/auth.config";
import { IAddress, Size } from "@/interfaces";
import prisma from "@/lib/prisma";
import { create } from 'zustand';

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

    // Calculate total items
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity , 0);

    // Calculate total tax, subtotal, and total
    const {subTotal, tax, total} = productIds.reduce((totals, item) => {

        const productQty = item.quantity;
        const product = products.find( p => p.id === item.productId);

        if (!product) {
            throw new Error(`${item.productId} does not exist`)
        };

        const subTotal = product.price * productQty;

        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;

        return totals;
    }, {subTotal: 0, tax: 0, total: 0});

    // Create database transaction
    const prismaTransaction = await prisma.$transaction( async(tx) => {
        // Update stock


        // Create order
        const order = await tx.order.create({
            data: {
                userId: userId,
                itemsInOrder: itemsInOrder,
                subTotal: subTotal,
                tax: tax,
                total: total,

                OrderItem: {
                    createMany: {
                        data: productIds.map( (p) => ({
                            quantity: p.quantity,
                            size: p.size,
                            productId: p.productId,
                            price: products.find( p2 => p2.id === p.productId)?.price ?? 0
                        }))
                    }
                }
            }
        })

        // Create order address
        const {country, ...restAddress} = address;
        const orderAddress = await tx.orderAddress.create({
            data: {
                ...restAddress,
                countryId: country,
                orderId: order.id
            }
        })

        return {
            updatedProducts: [],
            order: order,
            orderAddress: orderAddress,
        }
    })

}