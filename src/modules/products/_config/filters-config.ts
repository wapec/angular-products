import { IProductFilter } from '../_models/main-entities.models';

export const DEFAULT_FILTERS_CONFIG: IProductFilter[] = [
  {
    id: 'price',
    title: 'Price',
    values: [
      {
        id: 'price-0/100',
        title: 'Under 100',
        active: false,
      },
      {
        id: 'price-100/200',
        title: '100 to 200',
        active: false,
      },
      {
        id: 'price-200/Infinity',
        title: 'Above 200',
        active: false,
      },
    ],
  },
  {
    id: 'category_ids',
    title: 'Category',
    values: [],
  },
  {
    id: 'material',
    title: 'Material',
    values: [],
  },
  {
    id: 'size',
    title: 'Size',
    values: [],
  },
];
