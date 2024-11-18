export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  //type: Type;
  gender: 'men' | 'women' | 'kids' | 'unisex'
}
export interface ICategory {
  id: string;
  name: string;
}

export interface ICartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  images: string;
  sizes: Size;
}



export type Category = 'men' | 'women' | 'kids' | 'unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats';