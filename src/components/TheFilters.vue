<template>
  <div class="filters">
    <BaseSelect
      :value.sync="selectedOptionCategory"
      :options="Categories"
      :areOptionsVisible.sync="areOptionsVisibleCategory"
      @update:areOptionsVisible="toggleOptionCategory"
      @update:value="onCategoryUpdate"
      placeholder="Category"
    >
    </BaseSelect>

    <BaseSelect
      :value.sync="selectedOptionPrice"
      :options="Prices"
      :areOptionsVisible.sync="areOptionsVisiblePrice"
      @update:areOptionsVisible="toggleOptionPrice"
      @update:value="onPriceUpdate"
      placeholder="Sort By price"
    >
    </BaseSelect>
    <BaseRange
      v-model="priceValue"
      @input="onPriceChange"
      :min="minPrice"
      :max="maxPrice"
    >
    </BaseRange>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseRange from "@/components/BaseRange.vue";
import { IOption } from "@/interfaces/options";

@Component({
  components: {
    BaseSelect,
    BaseRange,
  },
})
export default class TheFilters extends Vue {
  selectedOptionCategory: IOption = {};
  selectedOptionPrice: IOption = {};
  areOptionsVisibleCategory = false;
  areOptionsVisiblePrice = false;

  Categories = [
    { id: 1, name: "All" },
    { id: 2, name: "smartphones" },
    { id: 3, name: "laptops" },
  ];

  Prices = [
    { id: 4, name: "Recommended" },
    { id: 5, name: "Price high to low" },
    { id: 6, name: "Price low to high" },
  ];

  minPrice = 0;
  maxPrice = 1750;
  priceValue = [this.minPrice, this.maxPrice];

  onCategoryUpdate() {
    this.$emit("sortCategory", this.selectedOptionCategory.name);
    this.selectedOptionPrice = {};
  }

  onPriceUpdate() {
    this.$emit("sortPrice", this.selectedOptionPrice.name);
    this.selectedOptionCategory = {};
  }

  toggleOptionCategory() {
    this.areOptionsVisiblePrice = false;
  }

  toggleOptionPrice() {
    this.areOptionsVisibleCategory = false;
  }

  onPriceChange(value: number): void {
    this.$emit("priceChange", value);
  }
}
</script>
<style scoped lang="scss">
.filters {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: $grey-lite;
  min-height: 50px;

  .options {
    display: flex;
    justify-content: center;
    margin-bottom: 4px;
    cursor: pointer;
    transition-duration: 0.5s;

    &:hover {
      padding: 0 10px;
      background-color: $grey;
      color: $white;
      border-radius: 40px;
    }
  }
}
</style>
