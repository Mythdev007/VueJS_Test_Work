<template>
  <v-card v-if="horisontal">
    <div class="d-flex flex-no-wrap justify-start">
      <v-avatar class="ma-3" size="125" tile>
        <v-img :src="imgSrc"></v-img>
      </v-avatar>
      <div>
        <v-card-title class="text-h5" v-text="title"></v-card-title>
        <div class="d-flex flex-row justify-between">
          <v-card-text class="text-left">
            <div class="my-4">{{ productType }}</div>
            <div>Quantity Sold: {{ quantitySold }}</div>
          </v-card-text>
          <v-card-title class="text-no-wrap">
            Price: {{ price }} $
          </v-card-title>
        </div>
      </div>
    </div>
  </v-card>
  <v-card v-else max-width="374" class="mx-auto">
    <v-img height="250" :src="imgSrc"></v-img>
    <v-card-title class="text-center">{{ title }}</v-card-title>
    <div class="d-flex justify-between">
      <v-card-text class="text-left">
        <div>{{ productType }}</div>
        <div>Quantity Sold: {{ quantitySold }}</div>
      </v-card-text>
      <v-card-title class="text-no-wrap"> Price: {{ price }} $ </v-card-title>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ProductCardItem",
  props: {
    horisontal: {
      type: Boolean,
      default: false,
    },
    imgSrc: {
      type: String,
      default: "",
      required: true,
    },
    title: {
      type: String,
      default: "",
      required: true,
    },
    productType: {
      type: String,
      default: "",
      required: true,
    },
    quantitySold: {
      type: Number,
      default: 0,
      required: true,
    },
    price: {
      type: String,
      default: "",
      required: true,
    },
  },
};
</script>
