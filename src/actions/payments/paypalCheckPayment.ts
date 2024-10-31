"use server";

import { IPaypalOrderStatus } from "@/interfaces";
import prisma from "@/lib/prisma";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPaypalBearerToken();
  
  if (!authToken) {
    return {
      ok: false,
      message: "Could not get token",
    };
  }
  
  const getVerifyPaypalPayment = await verifyPaypalPayment(
    paypalTransactionId,
    authToken
  );
  
  if (!getVerifyPaypalPayment) {
    return {
      ok: false,
      message: "Error trying to verify payment",
    };
  }
  
  const { status, purchase_units } = getVerifyPaypalPayment;
  console.log({ status, purchase_units });
  // TODO const { } = purchase_units[0];

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Not yet paid at Paypal",
    };
  }

  try {
    
    await prisma.order.update({
      where: {id: 'ad4cc439-28e9-4035-a0b7-68f706467e1e'},
      data: {
        isPaid: true,
        paidAt: new Date()
      }
    })
   
    //TODO: revalidate path
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: "Could not complete payment",
    };
  }
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const base64Token = Buffer.from(
    `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");
  urlencoded.append("ignoreCache", "true");
  urlencoded.append("return_authn_schemes", "true");
  urlencoded.append("return_client_metadata", "true");
  urlencoded.append("return_unconsented_scopes", "true");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(
      process.env.PAYPAL_OAUTH_URL ?? "",
      {
        ...requestOptions,
        cache: 'no-store'
      }
    ).then((response) => response.json());

    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPaypalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<IPaypalOrderStatus | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };
  try {
    return await fetch(paypalOrderUrl, {
      ...requestOptions,
      cache: 'no-store'
    }).then((response) =>
      response.json()
    );
  } catch (error) {
    console.log(error);
    return null;
  }
};
