'use client'

import { useCartStore } from "@/store";
import { useState, useEffect } from "react";
import { currencyFormat } from '../../../../utils/currencyFormat';

export const OrderSummary = () => {

    const [loaded, setLoaded] = useState(false);
    const { subTotal, getTotalItems, tax, total } = useCartStore(state => state.getSummaryInformation());

    useEffect(() => {
      setLoaded(true);
    }, [])
  
    if (!loaded) return <p>Loading...</p>

    return (
        <div className="grid grid-cols-2">
            <span>Products Qty.</span>
            <span className="text-right">{ getTotalItems() === 1 ? '1 Item' :  getTotalItems() + ' Items'} </span>

            <span>Subtotal</span>
            <span className="text-right">${currencyFormat(subTotal)}</span>

            <span>Tax (15%)</span>
            <span className="text-right">${currencyFormat(tax)}</span>

            <span className="mt-5 text-2xl">Total:</span>
            <span className="mt-5 text-2xl text-right">${currencyFormat(total)}</span>
        </div>
    )
}
