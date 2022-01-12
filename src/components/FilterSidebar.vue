<template>
  <v-sheet outlined>
    <v-list flat subheader two-line>
      <v-subheader>General</v-subheader>
      <v-list-item-group v-model="filters" multiple>
        <template v-for="(type, index) in itemsTypes">
          <v-list-item :value="type" :key="index">
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="text-capitalize">{{
                  type
                }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
        </template>
      </v-list-item-group>

      <v-list-item>
        <v-list-item-content>
          <v-range-slider
            dense
            hint="Filter by price range"
            min="0"
            :max="maxPrice"
            v-model="rangeFilter"
          ></v-range-slider>
          <v-list-item-subtitle class="d-flex flex-row justify-space-between">
            <span>{{ priceRangeFilter[0] }}</span>
            <span>{{ priceRangeFilter[1] }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FilterSidebar",
  computed: {
    ...mapGetters([
      "itemsTypes",
      "filtersAppied",
      "displayedItems",
      "priceRangeFilter",
      "maxPrice",
    ]),
    filters: {
      set(newValue) {
        return this.$store.dispatch("setFiltersByType", newValue);
      },
      get() {
        return this.filtersAppied;
      },
    },
    rangeFilter: {
      set(newValue) {
        return this.$store.dispatch("setPriceRange", newValue);
      },
      get() {
        return this.priceRangeFilter;
      },
    },
  },
};
</script>
