import { Title } from "@/components";
import { getProductBySlug } from '../../../../../actions/product/get-product-by-slug';
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";


interface Props {
    params: {
        slug: string;
    }
}

export default async function ProductPage({ params }: Props) {

    const { slug } = params;

    const product = await getProductBySlug(slug);

    // TODO: new

    if (!product) {
        redirect('/admin/products');
    }
    return (
        <>
        <Title title={`${ product.title === 'new' ? 'New Product' : product.title + ' [Edit Mode]' }`} />
        <ProductForm product={product}/>
        </>
    )
}
