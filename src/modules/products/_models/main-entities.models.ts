export interface IProductFilter {
  id: string;
  title: string;
  values: Array<{ id: string; title: string; active: boolean }>;
}

export interface IProductLink {
  sku: string;
  link_type: string; // TODO: Specify
  linked_product_sku: string;
  linked_product_type: string; // TODO: Specify
  position: number;
  extension_attributes: { qty: number };
}

export interface IProductCustomAttribute {
  attribute_code: string; // TODO: Specify
  value: string;
}

export interface IProduct {
  id: number;
  sku: string;
  name: string;
  attribute_set_id: number;
  status: number;
  visibility: number;
  type_id: 'grouped';
  created_at: string;
  updated_at: string;
  product_links: IProductLink[];
  tier_prices: any[];
  price: number;
  custom_attributes: IProductCustomAttribute[];
}
