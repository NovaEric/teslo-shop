"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {

    const order = await prisma.order.update({
        where: { id: orderId },
        data: { transactionId }
    });

    if (!order) {
        
        return {
            ok: false,
            message: "Could not find order with id: " + orderId,
        };
    }

    return { ok: true };

  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Could not update the transaction id",
    };
  }
};
