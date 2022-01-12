<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="2">
        <filter-sidebar />
      </v-col>

      <v-col>
        <sort-toolbar />
        <v-sheet min-height="70vh">
          <v-container>
            <v-row class="px-2 py-2">
              <v-col
                v-for="(item, index) in filteredItems"
                :key="index"
                :cols="isListMode ? 12 : 4"
              >
                <product-card-item
                  :horisontal="isListMode"
                  :imgSrc="item.imgSrc"
                  :title="item.title"
                  :productType="item.productType"
                  :quantitySold="item.quantitySold"
                  :price="item.price"
                ></product-card-item>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-col>
    </v-row>
    <v-overlay :value="isLoading" opacity="1" color="white">
      <v-progress-circular
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import ProductCardItem from "@/components/ProductCardItem.vue";
import SortToolbar from "@/components/SortToolbar.vue";
import FilterSidebar from "@/components/FilterSidebar.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    ProductCardItem,
    SortToolbar,
    FilterSidebar,
  },
  computed: {
    ...mapGetters(["isListMode", "filteredItems", "isLoading"]),
  },
  created() {
    this.$store.dispatch("getItems");
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0px;
}
</style>
