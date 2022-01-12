<template>
  <v-toolbar flat outlined class="align-center">
    <v-toolbar-title
      >Items Available: {{ $store.getters.items.length }}</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-btn icon small @click="setView('grid')">
      <v-icon> mdi-view-grid </v-icon>
    </v-btn>
    <v-btn icon small @click="setView('list')">
      <v-icon> mdi-view-list </v-icon>
    </v-btn>
    <v-responsive max-width="260">
      <v-select
        class="mt-4 ml-2"
        :items="orderBy"
        item-text="name"
        item-value="value"
        label="Sort By"
        @input="setOrderBy($event)"
        dense
        solo
      ></v-select>
    </v-responsive>
  </v-toolbar>
</template>

<script>
export default {
  name: "SortToolbar",
  data() {
    return {
      orderBy: [
        { value: "alphabetical", name: "A-Z" },
        { value: "priceAsc", name: "Low to High" },
        { value: "priceDesc", name: "High to Low" },
      ],
    };
  },
  methods: {
    setView(mode) {
      this.$store.commit("SET_CURRENT_VIEW", mode);
    },
    setOrderBy(orderBy) {
      this.$store.commit("SET_ORDER_BY", orderBy);
      this.$store.commit("SORT_ITEMS");
    },
  },
};
</script>
