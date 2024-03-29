<template>
  <div class="base-select">
    <div class="base-select__title" @click="toggleOption">
      <h5>
        {{ selectedOptionName || placeholder }}
      </h5>

      <img
        class="select-logo"
        src="@/design/images/openCtegoryIcon.svg"
        alt="select"
        :class="{ 'open-select': areOptionsVisible }"
      />
    </div>
    <div class="base-select__options" v-if="areOptionsVisible">
      <p
        class="option"
        v-for="option in options"
        :key="option.name"
        @click.stop="selectOption(option)"
      >
        {{ option.name }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IOption } from "@/interfaces/options";

@Component
export default class BaseSelect extends Vue {
  @Prop() options!: IOption[];
  @Prop() value!: IOption;
  @Prop({ default: "" }) placeholder!: string;
  @Prop({ default: false }) areOptionsVisible!: boolean;

  get selectedOptionName() {
    const selectedOpton = this.options?.find(
      (item: IOption) => item.id === this.value?.id
    );
    return selectedOpton?.name;
  }

  selectOption(option: IOption): void {
    this.$emit("update:value", option);
    this.$emit("update:areOptionsVisible", false);
  }

  hideSelect(): void {
    this.$emit("update:areOptionsVisible", false);
  }

  toggleOption(): void {
    this.$emit("update:areOptionsVisible", !this.areOptionsVisible);
  }
}
</script>
<style scoped lang="scss">
.base-select {
  position: relative;
  width: 200px;
  cursor: pointer;
  margin-left: 10px;

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    border: solid 1px $white;
    padding: 6px;

    .select-logo {
      height: 10px;
      width: 10px;
      margin-right: 10px;
      transform: rotate(180deg);
    }

    .open-select {
      transform: rotate(360deg);
    }
  }

  &__options {
    border: 1px solid $white;
    position: absolute;
    top: 40px;
    right: 0;
    width: 100%;
    z-index: 2;
    border-radius: 10px;
    padding: 10px;
    background-color: $grey-lite;
    .option {
      transition: 0.5s;
      padding-top: 10px;
      &:hover {
        transform: scale(1.04);
      }
    }
  }
}
</style>
