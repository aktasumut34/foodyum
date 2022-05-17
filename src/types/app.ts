export type ProductChoice = {
  id: number;
  product_addon_id: number;
  name: string;
  price: number;
  pre_select: number;
  is_selected?: any;
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

export type UserData = Record<string, any> | null;

export interface IDeliveryZone {
  id: number;
  location_id: number;
  name: string;
  min_amount: string;
  delivery_fee: string;
  shape_type: number;
  shape_data: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}
export interface IPaymentMethodSetting {
  id: number;
  location_id: number;
  service_id: number;
  payment_method_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  payment_method: {
    id: number;
    name: string;
    alias: string;
    order: number;
    is_active: number;
    created_at: string;
    updated_at: string;
  };
}
export interface IOrderingMethod {
  id: number;
  service_id: number;
  name: string;
  alias: string;
  order: number;
  is_active: 1;
  created_at: string;
  updated_at: string;
}
export interface IOpeningHour {
  id: number;
  location_id: number;
  service_id: number;
  days: string;
  start_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
}
export interface IDeliveryMethod {
  id: number;
  location_id: number;
  service_id: number;
  status: number;
  created_at: string;
  updated_at: string;
  service: {
    id: number;
    name: string;
    alias: string;
    is_taxable: number;
    is_schedule: number;
    order: number;
    is_active: number;
    created_at: string;
    updated_at: string;
    service_settings: {
      (key: string): {
        id: number;
        location_id: number;
        pre_order: number;
        min_guest: number;
        max_guest: number;
        min_time_advance: number;
        max_time_advance: number;
        hold_table: number;
        created_at: string;
        updated_at: string;
      };
      delivery_zones?: IDeliveryZone[];
    };
    payment_method_settings: IPaymentMethodSetting[];
    ordering_methods: IOrderingMethod[];
    opening_hours: IOpeningHour[];
  };
}
export interface IContact {
  id: number;
  location_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface IDeliveryAddress {
  id: number;
  location_id: number;
  user_id: number;
  ordering_cart_id: number;
  address_title: string;
  is_selected: number;
  city_area: string;
  street: string;
  zipcode: string;
  neighborhood: string;
  block: string;
  intercom: string;
  floor: string;
  apartment: string;
  where_to_park: string;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
}

export interface IUser {
  token?: string;
  user?: UserData;
  isLoggedIn?: boolean;
  contacts?: IContact[];
  deliveryMethods?: IDeliveryMethod[];
  deliveryAddresses?: IDeliveryAddress[];
}
