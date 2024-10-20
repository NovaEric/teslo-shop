'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { CreateOrderActions, CreateOrderData } from '@paypal/paypal-js'


interface Props {
  orderId: string;
  amount: number;
}

export const PaypalButton = ({ orderId, amount }: Props) => {

  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className='animate-pulse mb-16'>
        <div className='h-12 bg-gray-300 rounded'></div>
        <div className='h-12 bg-gray-300 rounded mt-2'></div>
        <div className='h-12 bg-gray-300 rounded mt-2'></div>
      </div>
    )
  }

  const createOrder = async( data: CreateOrderData, actions: CreateOrderActions ): Promise<string> => {
    
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          amount: {
            value: roundedAmount.toString(),
            currency_code: ''
          }
        }
      ],
      intent: 'CAPTURE'
    });

    console.log({transactionId})
    
    return transactionId;
  }

  return (
    <PayPalButtons
    createOrder={ createOrder }
    />
  )
}
