import { PaypalButton, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";
import { currencyFormat } from "@/utils";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = params;

  //TODO: call server action

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  const address = order!.OrderAddress;

  const IsPaid = () => {
    return (
      <div
        className={clsx(
          "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
          {
            "bg-amber-500": !order!.isPaid,
            "bg-green-500": order!.isPaid,
          }
        )}
      >
        <IoCardOutline size={30} />
        <span className="mx-2">{order?.isPaid ? "Paid" : "Make a payment"}</span>
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            
          <IsPaid/>

            {/* Items */}
            {order!.OrderItem.map((item) => (
              <div
                key={item.product.slug + "-" + item.size}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={item.product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{item.product.title}</p>
                  <p>${item.price * item.quantity}</p>
                  <p className="font-bold">
                    Subtotal: ${currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Shipping address</h2>
            <div className="mb-10">
              <p className="text-xl">
                {address!.firstName} {address!.lastName}
              </p>
              <p>{address!.address}</p>
              <p>{address!.address2}</p>
              <p>{address!.postalCode}</p>
              <p>
                {address!.city}, {address!.countryId}
              </p>
              <p>{address!.phone}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Order Summary</h2>

            <div className="grid grid-cols-2">
              <div className="grid grid-cols-2">
                <span>Products Qty.</span>
                <span className="text-right">
                  {order?.itemsInOrder === 1
                    ? "1 Item"
                    : order?.itemsInOrder + " Items"}{" "}
                </span>

                <span>Subtotal</span>
                <span className="text-right">
                  ${currencyFormat(order!.subTotal)}
                </span>

                <span>Tax (15%)</span>
                <span className="text-right">
                  ${currencyFormat(order!.tax)}
                </span>

                <span className="mt-5 text-2xl">Total:</span>
                <span className="mt-5 text-2xl text-right">
                  ${currencyFormat(order!.total)}
                </span>
              </div>
            </div>

            <div className="mt-5 mb-2 w-full">
              <PaypalButton orderId={order!.id} amount={order!.total}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
