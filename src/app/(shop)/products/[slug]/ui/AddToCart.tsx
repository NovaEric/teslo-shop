'use client'
import { SizeSelector, QuantitySelector } from '@/components'
import type { Product, Size, ICartProduct } from '@/interfaces'
import { useCartStore } from '@/store'
import { useState } from 'react'

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {

  const addProductToCart = useCartStore(state => state.addProductToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const addToCart = () => {

    setPosted(true);
    if (!size) return;

    const cartProduct: ICartProduct = {
      ...product,
      quantity: quantity,
      sizes: size,
      images: product.images[0]
    }

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);

  }

  return (
    <>
    {
      posted && !size && (
        <span className='mt-2 text-red-600 fade-in'>Must select a size</span>
      )
    }
      {/* Selector de Tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />


      {/* Selector de Cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={setQuantity}
      />


      {/* Button */}
      <button className="btn-primary my-5" onClick={() => addToCart()}>
        Agregar al carrito
      </button>
    </>
  )
}
