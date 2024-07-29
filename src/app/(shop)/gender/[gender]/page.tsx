export const revalidate = 60;
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { Gender } from '@prisma/client';

interface Props {
  params: {
    gender: string;
  },
  searchParams: {
    page?: string;
  }
}


export default async function CategoryPage({ params, searchParams }: Props) {

  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });


  // if (products?.length === 0) {
  //   redirect('/')
  // }

  if (!products) {
    return <div className="flex m-60 justify-center self-center text-red-600"> No Products to display :( </div>
  }

  //const products = seedProducts.filter( product => product.gender === id );

  const labels: Record<string, string> = {
    'men': 'for men',
    'women': 'for women',
    'kids': 'for kids',
    'unisex': 'for all'
  }

  // if ( id === 'kids' ) {
  //   notFound();
  // }


  return (
    <>
      <Title
        title={`Items ${labels[gender]}`}
        subtitle="All Products"
        className="mb-2"
      />
      <Pagination totalPages={totalPages} />

      <ProductGrid
        products={products}
      />

      <Pagination totalPages={totalPages} />

    </>
  );
}