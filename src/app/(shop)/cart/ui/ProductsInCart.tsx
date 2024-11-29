'use client';

import { ProductImage, QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Link from "next/link";
import { useState, useEffect } from "react";

export const ProductsInCart = () => {

    const updateProductCartQuantity = useCartStore(state => state.updateProductCartQuantity);
    const removeProductFromCart = useCartStore(state => state.removeProductFromCart);
    const productsInCart = useCartStore(state => state.cart);
    const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [])

  if (!loaded) return <p>Loading...</p>

  return (
    <>
     {productsInCart.map((product) => (
              <div key={`${product.slug}-${product.sizes}`} className="flex mb-5">
                <ProductImage
                  src={product.images}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <Link
                  className="hover:underline cursor-pointer"
                  href={`/products/${product.slug}`}
                  >{product.sizes} - {product.title}</Link>
                  <p>${product.price}</p>
                  <QuantitySelector quantity={product.quantity} onQuantityChanged={(qty) => updateProductCartQuantity(product, qty)}  />

                  <button className="underline mt-3" onClick={() => removeProductFromCart(product) } >Remove</button>
                </div>
              </div>
            ))}
    </>
  )
}
