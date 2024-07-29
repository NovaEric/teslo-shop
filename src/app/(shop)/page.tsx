export const revalidate = 60;
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";

interface Props {
  searchParams: {
    page?: string;
  }
}


export default async function Shop({searchParams}: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({page});


  // if (products?.length === 0) {
  //   redirect('/')
  // }

  if (!products) {
    return <div className="flex m-60 justify-center self-center text-red-600"> No Products to display :( </div>
  }

  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <Pagination totalPages={totalPages} />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
