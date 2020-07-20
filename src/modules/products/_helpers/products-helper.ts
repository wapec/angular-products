import { find, propEq, isEmpty } from 'ramda';

import {
  IProduct,
  IProductCustomAttribute,
} from '../_models/main-entities.models';

type ProcessProductsProps = {
  data: { items: IProduct[] };
  perPage: number;
  page: number;
  from: number;
  to: number;
  filters: string[];
};

export const processProducts = ({
  data,
  perPage,
  page,
  filters,
  from,
  to,
}: ProcessProductsProps) => {
  const { items } = data;
  let products = items.slice(from, to);

  if (!isEmpty(filters)) {
    let filteredProducts = [];
    filters.some((f) => {
      const [fieldName, fieldValue] = f.split('-');
      filteredProducts = [
        ...filteredProducts,
        ...products.filter((item) => {
          // Price special case process
          if (fieldName === 'price') {
            const [lower, upper] = fieldValue.split('/');
            const priceCondition =
              item.price && item.price > +lower && item.price < +upper;
            return priceCondition;
          }

          // Other fields process
          const foundMatch = find(propEq('attribute_code', fieldName))(
            item.custom_attributes
          ) as IProductCustomAttribute;

          const foundMatchCondition =
            foundMatch && foundMatch.value.includes(fieldValue);
          return foundMatchCondition;
        }),
      ];
    });
    products = filteredProducts;
  }
  const pagination = { page, perPage, total: items.length };

  return { pagination, products };
};
