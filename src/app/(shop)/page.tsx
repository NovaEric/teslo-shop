import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";


export default async function Shop() {

  const { products } = await getPaginatedProductsWithImages();

  console.log(products)
  return (
    <>
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
