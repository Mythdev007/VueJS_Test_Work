function sortByAlpabet(items) {
  return items.sort(function (a, b) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });
}

function sortByPriceAsc(items) {
  return items.sort((a, b) => a.price - b.price);
}

function sortByPriceDesc(items) {
  return items.sort((a, b) => b.price - a.price);
}

function sortItems(array, orderBy) {
  let sortedItems = array;

  switch (orderBy) {
    case "alphabetical":
      sortedItems = sortByAlpabet(array);
      break;
    case "priceAsc":
      sortedItems = sortByPriceAsc(array);
      break;
    case "priceDesc":
      sortedItems = sortByPriceDesc(array);
      break;
  }
  return sortedItems;
}

export { sortItems };
