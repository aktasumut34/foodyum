export type Product = {
  id: number;
  product_category_id: number;
  tax_category_id: number;
  name: string;
  description: string;
  price: number;
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

export type LocationInfo = {
  id: number;
  user_id: number;
  name: string;
  phone: string;
  website: string;
  country_code: string;
  state: string;
  city: string;
  zipcode: string;
  street: string;
  address: string;
  timezone: string;
  latitude: string;
  longitude: string;
  api_key: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  country: {
    id: number;
    code: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
  taxation_settings: {
    id: number;
    location_id: number;
    sales_tax_type: number;
    name: string;
    delivery_fee: number;
    currency_id: number;
    created_at: string;
    updated_at: string;
  };
};
