"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/font";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [inStock, setInStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStock = async () => {
      const stock = await getStockBySlug(slug);
      setInStock(stock);
      setIsLoading(false);
    };
    getStock();
  }, [slug]);

  return (
    <>
      {isLoading ? (
        <h1
          className={` ${titleFont.className} antialiased font-bold text-md animate-pulse bg-cyan-500 w-32 rounded`}
        >
        &nbsp;
        </h1>
      ) : (
        <h1
          className={` ${titleFont.className} antialiased font-bold text-md text-slate-500`}
        >
          In Stock: <span className="text-cyan-500">{inStock}</span>
        </h1>
      )}
    </>
  );
};
