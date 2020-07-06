import { mergeDeepRight, concat } from 'ramda';

import {
  IProduct,
  IProductFilter,
  IProductCustomAttribute,
} from '../_models/main-entities.models';
import { DEFAULT_FILTERS_CONFIG } from '../_config/filters-config';

// Drop repeats in array of object with a certain key
const dropRepeatsByKey = (key: string, data: any[]) => [
  ...new Map(data.map((item) => item && [item[key], item])).values(),
];

// Filter all attributes
const checkAttributeValue = (item: IProductCustomAttribute) => {
  const { value } = item;
  return (
    (typeof value === 'string' && parseInt(value)) ||
    (typeof value === 'string' &&
      value.split(',').every((i: string) => parseInt(i))) ||
    (typeof value !== 'string' &&
      value.every((i: string) => typeof i === 'string'))
  );
};

export const defineFiltersHelper = (list: IProduct[]): IProductFilter[] => {
  let filters = DEFAULT_FILTERS_CONFIG;

  filters = list.reduce((acc: IProductFilter[], curr: IProduct) => {
    const attributes = curr.custom_attributes.filter((item) =>
      checkAttributeValue(item)
    );

    // Set new attributes to filters
    attributes.forEach((attribute) => {
      const attributeValues =
        typeof attribute.value === 'string'
          ? attribute.value.split(',')
          : attribute.value;

      if (attributeValues) {
        const foundFilter = acc.find(
          (item) => item.id === attribute.attribute_code
        );
        const newAttributes = attributeValues.map((attributeValue) => {
          return {
            id: `${attribute.attribute_code}-${attributeValue}`,
            title: `${attribute.attribute_code} ${attributeValue}`,
            active: false,
          };
        });
        if (foundFilter) {
          acc.forEach(
            (item) =>
              item.id === foundFilter.id &&
              item.values.push(...newAttributes)
          );
        } else {
          acc.push({
            id: attribute.attribute_code,
            title: attribute.attribute_code,
            values: newAttributes,
          });
        }
      }
    });
    return acc;
  }, filters);

  return filters.map((item) => ({
    ...item,
    values: dropRepeatsByKey('id', item.values),
  }));;
};
