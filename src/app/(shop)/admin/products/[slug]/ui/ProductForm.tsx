"use client";

import { createUpdateProduct, deleteProductImage } from "@/actions";
import { ProductImage } from "@/components";
import { ICategory, Product } from "@/interfaces";
import { ProductImage as ProductWithImage } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
    product: Partial<Product> & { ProductImage?: ProductWithImage[] };
    categories: ICategory[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: "men" | "women" | "kids" | "unisex";
  categoryId: string;
  images?: FileList;
}

export const ProductForm = ({ product, categories }: Props) => {

    const router = useRouter();

    const {
        handleSubmit,
        register,
        formState: { isValid },
        getValues,
        setValue,
        watch
    } = useForm<FormInputs>({
        defaultValues: {
            ...product,
            tags: product.tags?.join(', '),
            sizes: product.sizes ?? [],
            images: undefined
        }
    });

    watch('sizes');

    const onSizeChange = (size: string) => {

        const sizes = new Set(getValues('sizes'));
        sizes.has(size) ? sizes.delete(size) : sizes.add(size);
        setValue('sizes', Array.from(sizes))
    }

    const onSubmit = async (data: FormInputs) => {

        const formData = new FormData();

        const { images, ...productToSave } = data;

        if (product.id) {
            formData.append("id", product.id ?? "");
        }

        formData.append("title", productToSave.title);
        formData.append("slug", productToSave.slug);
        formData.append("description", productToSave.description);
        formData.append("price", productToSave.price.toString());
        formData.append("inStock", productToSave.inStock.toString());
        formData.append("sizes", productToSave.sizes.toString());
        formData.append("tags", productToSave.tags);
        formData.append("categoryId", productToSave.categoryId);
        formData.append("gender", productToSave.gender);


        if (images) {
            for (let index = 0; index < images.length; index++) {
                formData.append('images', images[index]);
            }    
        }

        const { ok, product: updatedProduct } = await createUpdateProduct(formData);

        if (!ok) {
            alert('Could not update product')
            return;
        }
        router.replace(`/admin/products/${updatedProduct?.slug}`)
        
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Tittle</span>
                    <input title="Title" type="text" className="p-2 border rounded-md bg-gray-200" {...register('title', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Slug</span>
                    <input title="Slug" type="text" className="p-2 border rounded-md bg-gray-200"{...register('slug', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Description</span>
                    <textarea
                        title="Description"
                        rows={5}
                        className="p-2 border rounded-md bg-gray-200"
                        {...register('description', { required: true })}
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Price</span>
                    <input title="Price" type="number" className="p-2 border rounded-md bg-gray-200" {...register('price', { required: true, min: 0 })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Tags</span>
                    <input title="Tags" type="text" className="p-2 border rounded-md bg-gray-200" {...register('tags', { required: true })} />
                </div>

                <div className="flex flex-col mb-2">
                    <span>Gender</span>
                    <select title="Select Gender" className="p-2 border rounded-md bg-gray-200" {...register('gender', { required: true })}>
                        <option value="">[Select]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span>Category</span>
                    <select title="Select Category" className="p-2 border rounded-md bg-gray-200" {...register('categoryId', { required: true })}>
                        <option value="">[Select]</option>
                        {
                            categories.map(ca => {
                                return <option key={ca.id} value={ca.id}>{ca.name}</option>
                            })
                        }
                    </select>
                </div>

                <button className="btn-primary w-full">
                    Save
                </button>
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span>Inventory</span>
                    <input title="Inventory" type="number" className="p-2 border rounded-md bg-gray-200" {...register('inStock', { required: true, min: 0 })} />
                </div>
                {/* As checkboxes */}
                <div className="flex flex-col">

                    <span>Sizes</span>
                    <div className="flex flex-wrap">

                        {
                            sizes.map(size => (
                                // bg-blue-500 text-white <--- si está seleccionado
                                <div
                                    key={size}
                                    onClick={() => onSizeChange(size)}
                                    className={
                                        clsx(
                                            `p-2 border cursor-pointer rounded-md mr-2 mb-2 w-14 transition-all text-center`,
                                            {
                                                'bg-blue-500 text-white': getValues('sizes').includes(size)
                                            }
                                        )
                                    }
                                >
                                    <span>{size}</span>
                                </div>
                            ))
                        }

                    </div>


                    <div className="flex flex-col mb-2">

                        <span>Photos</span>
                        <input
                            title="Photos"
                            type="file"
                            { ...register('images') }
                            multiple
                            className="p-2 border rounded-md bg-gray-200"
                            accept="image/png, image/jpeg, image/avif"
                        />

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {product.ProductImage?.map((image) => (
                            <div key={image.id}>
                                <ProductImage
                                    alt={product.title ?? ""}
                                    src={image.url}
                                    width={300}
                                    height={300}
                                    className="rounded-t shadow-md"
                                />

                                <button
                                    type="button"
                                    onClick={() => deleteProductImage(image.id, image.url)}
                                    className="btn-danger w-full rounded-b-xl"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </form>
    );
};