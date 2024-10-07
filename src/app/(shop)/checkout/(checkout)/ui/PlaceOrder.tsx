"use client";
import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const PlaceOrder = () => {

  const router = useRouter();
  const [loaded, setLoaded] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);
  const { subTotal, getTotalItems, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );
  const cart = useCartStore(state => state.cart);
  const clearCart = useCartStore(state => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map( product => ({
        productId: product.id,
        quantity: product.quantity,
        size: product.sizes
    }))
    
    //! Server Action
    const res = await placeOrder(productsToOrder, address);

    if (!res.ok) {
      setIsPlacingOrder(true);
      setErrorMsg(res.message);
      return;
    }
    
    //* Todo salio bien!
    clearCart();
    router.replace( '/orders/' + res.order?.id );
  };

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2">Shipping address</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Order Summary</h2>

      <div className="grid grid-cols-2">
        <div className="grid grid-cols-2">
          <span>Products Qty.</span>
          <span className="text-right">
            {getTotalItems() === 1 ? "1 Item" : getTotalItems() + " Items"}{" "}
          </span>

          <span>Subtotal</span>
          <span className="text-right">${currencyFormat(subTotal)}</span>

          <span>Tax (15%)</span>
          <span className="text-right">${currencyFormat(tax)}</span>

          <span className="mt-5 text-2xl">Total:</span>
          <span className="mt-5 text-2xl text-right">
            ${currencyFormat(total)}
          </span>
        </div>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            By clicking you accept{" "}
            <a href="#" className="underline">
              terms and conditions
            </a>{" "}
            &{" "}
            <a href="#" className="underline">
              privacy policy
            </a>
          </span>
        </p>

        <p className="text-red-500"> { errorMsg } </p>
        <button 
        onClick={onPlaceOrder}
        className={clsx({
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder
            
        })}>place order</button>
      </div>
    </div>
  );
};
