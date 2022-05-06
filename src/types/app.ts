export type Product = {
  id: number;
  product_category_id: number;
  tax_category_id: number;
  name: string;
  description: string;
  price: string;
  order: number;
  img_url: string;
  created_at: string;
  updated_at: string;
  storage_img_url: string;
  product_visibilities: unknown[];
  product_addon_choices: unknown[];
  product_types: unknown[];
};

export type ProductCategory = {
  id: number;
  product_menu_id: number;
  name: string;
  description: string;
  img_url: string;
  order: number;
  is_active: number;
  created_at: string;
  updated_at: string;
  storage_img_url: string;
  product_visibilities: unknown[];
  product_addon_choices: unknown[];
  products: Product[];
};
