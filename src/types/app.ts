export type ProductChoice = {
  id: number;
  product_addon_id: number;
  name: string;
  price: number;
  pre_select: number;
  is_selected?: boolean;
  order: number;
  created_at: string;
  updated_at: string;
};

export type ProductAddon = {
  id: number;
  location_id: number;
  name: string;
  type: number;
  allow_adding_same: number;
  force_min: number;
  force_max: number;
  order: number;
  created_at: string;
  updated_at: string;
  product_choices: ProductChoice[];
};

export type ProductAddonChoice = {
  id: number;
  product_addon_id: number;
  order: number;
  contextable_type: string;
  contextable_id: number;
  created_at: string;
  updated_at: string;
  product_addon: ProductAddon;
};

export type ProductType = {
  id: number;
  product_id: number;
  name: string;
  price: number;
  is_selected: number;
  order: number;
  created_at: string;
  updated_at: string;
  product_addon_choices: ProductAddonChoice[];
};

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
  product_addon_choices: ProductAddonChoice[];
  product_types: ProductType[];
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
  product_addon_choices: ProductAddonChoice[];
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

export type TenantInfo = {
  id: string;
  company: string;
  created_at: string;
  updated_at: string;
  email: string;
  last_name: string;
  first_name: string;
  central_user_id: number;
};
