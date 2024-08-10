'use client'
import { SizeSelector, QuantitySelector } from '@/components'
import { Product, Size } from '@/interfaces'
import { useState } from 'react'

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const addToCart = () => {

    setPosted(true);
    if (!size) return;

    console.log({ size, quantity })
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
