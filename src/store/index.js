import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import { sortItems } from "@/utils/sort.js";
import {
  filterByPrice,
  filterByProductType,
  getMaxPrice,
} from "@/utils/filters.js";

Vue.use(Vuex);

const API_URL = process.env.VUE_APP_API_URL;
const SECRET = process.env.VUE_APP_API_SECRET_KEY;

console.log(process.env);
console.log(API_URL, SECRET);

export default new Vuex.Store({
  state: {
    isLoading: false,
    items: [],
    errors: null,
    currentView: "grid",
    itemsOrderBy: "alphabetical",
    itemsTypes: [],
    filtersAppied: [],
    filteredItems: undefined,
    priceRange: [],
    maxPrice: undefined,
  },

  mutations: {
    SET_ITEMS(state, data) {
      const items = [];

      data.forEach((item) => {
        item.variants.forEach((variant) => {
          items.push({
            title: `${item.title} ${variant.title}`,
            productType: item.product_type,
            imgSrc: item.image.src,
            price: variant.price,
            quantitySold: item.quantitySold,
          });
        });
      });

      const itemsTypes = items
        .map((item) => item.productType)
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        });

      state.items = items;
      state.filteredItems = items;
      state.itemsTypes = itemsTypes;

      state.isLoading = false;
      state.maxPrice = getMaxPrice(items);
      state.priceRange = [0, state.maxPrice];
    },

    SET_ITEMS_ERROR(state, errors) {
      Object.assign(state, { errors });
      state.isLoading = false;
    },

    SET_ITEMS_LOADING(state) {
      state.isLoading = true;
    },

    SET_CURRENT_VIEW(state, mode) {
      state.currentView = mode;
    },

    SET_ORDER_BY(state, orderBy) {
      state.itemsOrderBy = orderBy;
    },

    SORT_ITEMS(state) {
      const filteredItems = sortItems(state.filteredItems, state.itemsOrderBy);
      Object.assign(state, { filteredItems });
    },

    SET_TYPE_FILTERS(state, filtersAppied) {
      Object.assign(state, { filtersAppied });
    },

    SET_RANGE_FILTERS(state, priceRange) {
      Object.assign(state, { priceRange });
    },

    FILTER_ITEMS(state) {
      let filteredItems = state.items;

      filteredItems = filterByProductType(
        filterByPrice(filteredItems, state.priceRange[0], state.priceRange[1]),
        state.filtersAppied
      );

      filteredItems = sortItems(filteredItems, state.itemsOrderBy);

      Object.assign(state, { filteredItems });
    },
  },

  actions: {
    getItems(state) {
      state.commit("SET_ITEMS_LOADING");

      axios
        .get(API_URL, {
          headers: {
            secretKey: SECRET,
          },
        })
        .then((response) => {
          console.log(response);
          state.commit("SET_ITEMS", response.data);
          state.commit("SORT_ITEMS");
        })
        .catch((error) => {
          state.commit("SET_ITEMS_ERROR", error.data);
        });
    },

    setFiltersByType(state, newValue) {
      state.commit("SET_TYPE_FILTERS", newValue);
      state.commit("FILTER_ITEMS");
    },

    setPriceRange(state, range) {
      state.commit("SET_RANGE_FILTERS", range);
      state.commit("FILTER_ITEMS");
    },
  },
  getters: {
    items: (state) => state.items,
    isLoading: (state) => state.isLoading,
    isListMode: (state) => state.currentView === "list",
    itemsOrderBy: (state) => state.itemsOrderBy,
    filtersAppied: (state) => state.filtersAppied,
    itemsTypes: (state) => state.itemsTypes,
    filteredItems: (state) => state.filteredItems,
    priceRangeFilter: (state) => state.priceRange,
    maxPrice: (state) => state.maxPrice,
  },
});
