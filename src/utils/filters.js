function filterByPrice(array, minPrice, maxPrice) {
  return array.filter((item) => {
    return item.price >= minPrice && item.price <= maxPrice;
  });
}

function filterByProductType(array, selectedTypes) {
  return array.filter((item) => {
    return selectedTypes.includes(item.productType);
  });
}

function getMaxPrice(array) {
  return Math.max(...array.map((item) => Math.ceil(parseFloat(item.price))));
}

export { filterByPrice, filterByProductType, getMaxPrice };
