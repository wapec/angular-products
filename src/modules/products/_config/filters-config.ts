import { IProductFilter } from '../_models/main-entities.models';

export const DEFAULT_FILTERS_CONFIG: IProductFilter[] = [
  {
    id: 'price',
    title: 'Price',
    values: [
      {
        id: '0-100',
        title: 'Under 100',
        active: false,
      },
      {
        id: '100-200',
        title: '100 to 200',
        active: false,
      },
      {
        id: '200-Infinity',
        title: 'Above 200',
        active: false,
      },
    ],
  },
  {
    id: 'category',
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
