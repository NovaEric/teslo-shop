'use client'

import React from "react";
import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

interface Props {
    children: React.ReactNode;
}

export const Providers = ({children}: Props) => {

  console.log(process.env.NEXT_PUBLIC_CLIENT_ID)
  return (
    <PayPalScriptProvider options={{ 
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? '',
      intent: 'capture',
      currency: 'USD'
      }}>

    <SessionProvider>
        {children}
    </SessionProvider>
    </PayPalScriptProvider>
  )
}
