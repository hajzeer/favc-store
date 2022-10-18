<template>
  <button
    :aria-label="`${value} ${attributeName}`"
    @click="$emit('selectVariant', attributeName, value)"
    :class="dynamicButtonClasses"
  >
    <div>
      {{ value }}
    </div>
  </button>
</template>

<script>
export default {
  props: {
    isSelected: {
      type: Boolean,
      required: true,
      default: false,
    },
    attributeName: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dynamicButtonClasses: this.retrieveDynamicClasses(),
    };
  },
  methods: {
    retrieveDynamicClasses: function () {
      const baseClass = "variant-selector__button";
      let stylesArr = [baseClass];
      this.isSelected && stylesArr.push(`${baseClass}--is-selected`);

      return stylesArr.join(" ");
    },
  },
  watch: {
    isSelected: function () {
      this.dynamicButtonClasses = this.retrieveDynamicClasses();
    },
    attr: function () {
      this.dynamicButtonClasses = this.retrieveDynamicClasses();
    },
    value: function () {
      this.dynamicButtonClasses = this.retrieveDynamicClasses();
    },
    image: function () {
      this.dynamicButtonClasses = this.retrieveDynamicClasses();
    },
  },
};
</script>

<style scoped src='./button.css'></style>
