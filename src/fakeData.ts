export const productMenu = {
  status: "true",
  message: "Product menu has been fetched.",
  data: {
    id: 1,
    location_id: 1,
    name: "Menu 1",
    order: 1,
    is_active: 1,
    created_at: null,
    updated_at: null,
    product_categories: [
      {
        id: 1,
        product_menu_id: 1,
        name: "Pasta",
        description: null,
        img_url:
          "https://d2vwsr3mua7yp8.cloudfront.net/c9b43103-ad85-47fd-bc01-7c234f796fdb_d2.jpg",
        order: 1,
        is_active: 1,
        created_at: "2022-04-29T08:41:26.000000Z",
        updated_at: "2022-04-29T08:41:26.000000Z",
        storage_img_url:
          "/storage/https://d2vwsr3mua7yp8.cloudfront.net/c9b43103-ad85-47fd-bc01-7c234f796fdb_d2.jpg",
        product_visibilities: [],
        product_addon_choices: [
          {
            id: 1,
            product_addon_id: 1,
            order: 1,
            contextable_type:
              "App\\Models\\Tenant\\ProductCategory\\ProductCategory",
            contextable_id: 1,
            created_at: null,
            updated_at: null,
            product_addon: {
              id: 1,
              location_id: 1,
              name: "Crust",
              type: 1,
              allow_adding_same: null,
              force_min: 1,
              force_max: 1,
              order: 1,
              created_at: "2022-04-29T08:41:26.000000Z",
              updated_at: "2022-04-29T08:41:26.000000Z",
              product_choices: [
                {
                  id: 1,
                  product_addon_id: 1,
                  name: "Thick",
                  price: "0.00",
                  pre_select: 1,
                  order: 1,
                  created_at: null,
                  updated_at: null,
                },
                {
                  id: 2,
                  product_addon_id: 1,
                  name: "Crispy",
                  price: "0.00",
                  pre_select: 0,
                  order: 2,
                  created_at: null,
                  updated_at: null,
                },
              ],
            },
          },
          {
            id: 2,
            product_addon_id: 2,
            order: 2,
            contextable_type:
              "App\\Models\\Tenant\\ProductCategory\\ProductCategory",
            contextable_id: 1,
            created_at: null,
            updated_at: null,
            product_addon: {
              id: 2,
              location_id: 1,
              name: "Extra Toppings (Small)",
              type: 0,
              allow_adding_same: 0,
              force_min: null,
              force_max: null,
              order: 2,
              created_at: "2022-04-29T08:41:26.000000Z",
              updated_at: "2022-04-29T08:41:26.000000Z",
              product_choices: [
                {
                  id: 3,
                  product_addon_id: 2,
                  name: "Corn",
                  price: "0.70",
                  pre_select: 0,
                  order: 1,
                  created_at: null,
                  updated_at: null,
                },
                {
                  id: 4,
                  product_addon_id: 2,
                  name: "Extra mozzarella",
                  price: "1.20",
                  pre_select: 0,
                  order: 2,
                  created_at: null,
                  updated_at: null,
                },
              ],
            },
          },
        ],
        products: [
          {
            id: 1,
            product_category_id: 1,
            tax_category_id: 1,
            name: "Spaghetti Bolognese",
            description: "Spaghetti, ground beef, tomato sauce, parmesan",
            price: "9.00",
            order: 0,
            img_url: null,
            created_at: null,
            updated_at: null,
            storage_img_url: null,
            product_visibilities: [],
            product_addon_choices: [],
            product_types: [],
          },
          {
            id: 2,
            product_category_id: 1,
            tax_category_id: 1,
            name: "Spaghetti Carbonara",
            description: "Spaghetti, eggs, pancetta, garlic, parmesan",
            price: "12.00",
            order: 0,
            img_url: null,
            created_at: null,
            updated_at: null,
            storage_img_url: null,
            product_visibilities: [],
            product_addon_choices: [],
            product_types: [],
          },
        ],
      },
      {
        id: 2,
        product_menu_id: 1,
        name: "Drinks",
        description: null,
        img_url:
          "https://d2vwsr3mua7yp8.cloudfront.net/38348db5-caf2-43be-831a-f1f3b0d89c2b_d2.jpg",
        order: 1,
        is_active: 1,
        created_at: "2022-04-29T08:41:26.000000Z",
        updated_at: "2022-04-29T08:41:26.000000Z",
        storage_img_url:
          "/storage/https://d2vwsr3mua7yp8.cloudfront.net/38348db5-caf2-43be-831a-f1f3b0d89c2b_d2.jpg",
        product_visibilities: [],
        product_addon_choices: [],
        products: [
          {
            id: 3,
            product_category_id: 2,
            tax_category_id: 1,
            name: "Coffee",
            description: null,
            price: "1.50",
            order: 0,
            img_url: null,
            created_at: null,
            updated_at: null,
            storage_img_url: null,
            product_visibilities: [],
            product_addon_choices: [],
            product_types: [],
          },
          {
            id: 4,
            product_category_id: 2,
            tax_category_id: 1,
            name: "Pepsi",
            description: null,
            price: "1.70",
            order: 0,
            img_url: null,
            created_at: null,
            updated_at: null,
            storage_img_url: null,
            product_visibilities: [],
            product_addon_choices: [],
            product_types: [],
          },
          {
            id: 5,
            product_category_id: 2,
            tax_category_id: 1,
            name: "Lemonade",
            description: null,
            price: "3.00",
            order: 0,
            img_url: null,
            created_at: null,
            updated_at: null,
            storage_img_url: null,
            product_visibilities: [],
            product_addon_choices: [],
            product_types: [],
          },
        ],
      },
      {
        id: 3,
        product_menu_id: 1,
        name: "Pizza",
        description: null,
        img_url:
          "https://d2vwsr3mua7yp8.cloudfront.net/1e0bcfa5-cff2-4e64-8671-bf33933a6a33_d2.jpg",
        order: 1,
        is_active: 1,
        created_at: "2022-04-29T08:41:26.000000Z",
        updated_at: "2022-04-29T08:41:26.000000Z",
        storage_img_url:
          "/storage/https://d2vwsr3mua7yp8.cloudfront.net/1e0bcfa5-cff2-4e64-8671-bf33933a6a33_d2.jpg",
        product_visibilities: [],
        product_addon_choices: [
          {
            id: 3,
            product_addon_id: 1,
            order: 1,
            contextable_type:
              "App\\Models\\Tenant\\ProductCategory\\ProductCategory",
            contextable_id: 3,
            created_at: null,
            updated_at: null,
            product_addon: {
              id: 1,
              location_id: 1,
              name: "Crust",
              type: 1,
              allow_adding_same: null,
              force_min: 1,
              force_max: 1,
              order: 1,
              created_at: "2022-04-29T08:41:26.000000Z",
              updated_at: "2022-04-29T08:41:26.000000Z",
              product_choices: [
                {
                  id: 1,
                  product_addon_id: 1,
                  name: "Thick",
                  price: "0.00",
                  pre_select: 1,
                  order: 1,
                  created_at: null,
                  updated_at: null,
                },
                {
                  id: 2,
                  product_addon_id: 1,
                  name: "Crispy",
                  price: "0.00",
                  pre_select: 0,
                  order: 2,
                  created_at: null,
                  updated_at: null,
                },
              ],
            },
          },
        ],
        products: [
          {
            id: 6,
            product_category_id: 3,
            tax_category_id: 1,
            name: "Pizza Margherita",
            description: "Tomato sauce, oregano, mozzarella and fresh basil",
            price: null,
            order: 0,
            img_url: null,
            created_at: "2022-04-29T08:41:26.000000Z",
            updated_at: "2022-04-29T08:41:26.000000Z",
            storage_img_url: null,
            product_visibilities: [],
            product_addon_choices: [],
            product_types: [
              {
                id: 1,
                product_id: 6,
                name: "Small",
                price: "7.00",
                is_selected: 1,
                order: 1,
                created_at: "2022-04-29T08:41:26.000000Z",
                updated_at: "2022-04-29T08:41:26.000000Z",
                product_addon_choices: [
                  {
                    id: 4,
                    product_addon_id: 2,
                    order: 1,
                    contextable_type:
                      "App\\Models\\Tenant\\ProductType\\ProductType",
                    contextable_id: 1,
                    created_at: null,
                    updated_at: null,
                    product_addon: {
                      id: 2,
                      location_id: 1,
                      name: "Extra Toppings (Small)",
                      type: 0,
                      allow_adding_same: 0,
                      force_min: null,
                      force_max: null,
                      order: 2,
                      created_at: "2022-04-29T08:41:26.000000Z",
                      updated_at: "2022-04-29T08:41:26.000000Z",
                      product_choices: [
                        {
                          id: 3,
                          product_addon_id: 2,
                          name: "Corn",
                          price: "0.70",
                          pre_select: 0,
                          order: 1,
                          created_at: null,
                          updated_at: null,
                        },
                        {
                          id: 4,
                          product_addon_id: 2,
                          name: "Extra mozzarella",
                          price: "1.20",
                          pre_select: 0,
                          order: 2,
                          created_at: null,
                          updated_at: null,
                        },
                      ],
                    },
                  },
                ],
              },
              {
                id: 2,
                product_id: 6,
                name: "Large",
                price: "9.00",
                is_selected: 0,
                order: 2,
                created_at: "2022-04-29T08:41:26.000000Z",
                updated_at: "2022-04-29T08:41:26.000000Z",
                product_addon_choices: [
                  {
                    id: 5,
                    product_addon_id: 3,
                    order: 2,
                    contextable_type:
                      "App\\Models\\Tenant\\ProductType\\ProductType",
                    contextable_id: 2,
                    created_at: null,
                    updated_at: null,
                    product_addon: {
                      id: 3,
                      location_id: 1,
                      name: "Extra Toppings (Large)",
                      type: 0,
                      allow_adding_same: 0,
                      force_min: null,
                      force_max: null,
                      order: 3,
                      created_at: "2022-04-29T08:41:26.000000Z",
                      updated_at: "2022-04-29T08:41:26.000000Z",
                      product_choices: [
                        {
                          id: 5,
                          product_addon_id: 3,
                          name: "Corn",
                          price: "1.20",
                          pre_select: 0,
                          order: 1,
                          created_at: null,
                          updated_at: null,
                        },
                        {
                          id: 6,
                          product_addon_id: 3,
                          name: "Extra mozzarella",
                          price: "1.70",
                          pre_select: 0,
                          order: 2,
                          created_at: null,
                          updated_at: null,
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
          {
            id: 7,
            product_category_id: 3,
            tax_category_id: 1,
            name: "Pizza Prosciutto",
            description: "Tomato sauce, mozzarella, prosciutto",
            price: null,
            order: 0,
            img_url: null,
            created_at: "2022-04-29T08:41:26.000000Z",
            updated_at: "2022-04-29T08:41:26.000000Z",
            storage_img_url: null,
            product_visibilities: [],
            product_addon_choices: [],
            product_types: [
              {
                id: 3,
                product_id: 7,
                name: "Small",
                price: "8.00",
                is_selected: 1,
                order: 1,
                created_at: "2022-04-29T08:41:26.000000Z",
                updated_at: "2022-04-29T08:41:26.000000Z",
                product_addon_choices: [
                  {
                    id: 6,
                    product_addon_id: 2,
                    order: 1,
                    contextable_type:
                      "App\\Models\\Tenant\\ProductType\\ProductType",
                    contextable_id: 3,
                    created_at: null,
                    updated_at: null,
                    product_addon: {
                      id: 2,
                      location_id: 1,
                      name: "Extra Toppings (Small)",
                      type: 0,
                      allow_adding_same: 0,
                      force_min: null,
                      force_max: null,
                      order: 2,
                      created_at: "2022-04-29T08:41:26.000000Z",
                      updated_at: "2022-04-29T08:41:26.000000Z",
                      product_choices: [
                        {
                          id: 3,
                          product_addon_id: 2,
                          name: "Corn",
                          price: "0.70",
                          pre_select: 0,
                          order: 1,
                          created_at: null,
                          updated_at: null,
                        },
                        {
                          id: 4,
                          product_addon_id: 2,
                          name: "Extra mozzarella",
                          price: "1.20",
                          pre_select: 0,
                          order: 2,
                          created_at: null,
                          updated_at: null,
                        },
                      ],
                    },
                  },
                ],
              },
              {
                id: 4,
                product_id: 7,
                name: "Large",
                price: "10.00",
                is_selected: 0,
                order: 2,
                created_at: "2022-04-29T08:41:26.000000Z",
                updated_at: "2022-04-29T08:41:26.000000Z",
                product_addon_choices: [
                  {
                    id: 7,
                    product_addon_id: 3,
                    order: 1,
                    contextable_type:
                      "App\\Models\\Tenant\\ProductType\\ProductType",
                    contextable_id: 4,
                    created_at: null,
                    updated_at: null,
                    product_addon: {
                      id: 3,
                      location_id: 1,
                      name: "Extra Toppings (Large)",
                      type: 0,
                      allow_adding_same: 0,
                      force_min: null,
                      force_max: null,
                      order: 3,
                      created_at: "2022-04-29T08:41:26.000000Z",
                      updated_at: "2022-04-29T08:41:26.000000Z",
                      product_choices: [
                        {
                          id: 5,
                          product_addon_id: 3,
                          name: "Corn",
                          price: "1.20",
                          pre_select: 0,
                          order: 1,
                          created_at: null,
                          updated_at: null,
                        },
                        {
                          id: 6,
                          product_addon_id: 3,
                          name: "Extra mozzarella",
                          price: "1.70",
                          pre_select: 0,
                          order: 2,
                          created_at: null,
                          updated_at: null,
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

export const locationInfo = {
  status: "true",
  message: "Location information fetched.",
  data: {
    id: 1,
    user_id: 1,
    name: "IQ Motion",
    phone: null,
    website: "iqmotion.com",
    country_code: "tr",
    state: "Izmir",
    city: "Izmir",
    zipcode: "35100",
    street: null,
    address: "Ankara Caddesi, 35100, Izmir, Izmir, Turkey",
    timezone: null,
    latitude: "38.451748413306376",
    longitude: "27.191118968628984",
    deleted_at: null,
    created_at: "2022-04-29T08:41:26.000000Z",
    updated_at: "2022-05-05T07:46:24.000000Z",
    country: {
      id: 2,
      code: "tr",
      name: "Turkey",
      created_at: null,
      updated_at: null,
    },
    taxation_settings: {
      id: 1,
      location_id: 1,
      sales_tax_type: 1,
      name: "VAT",
      delivery_fee: 18,
      currency_id: 1,
      created_at: null,
      updated_at: null,
    },
  },
};
