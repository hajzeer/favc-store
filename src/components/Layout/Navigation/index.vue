<template>
    <nav class="container" :class="{ active: isActive, disactive: !isActive }">
      <ul class="nav__list" >
        <li
            v-for="child of navItems"
            :key="child.path"
            class="nav__item"
            @click="$emit('click')"
        >
          <NuxtLink :to="child.path">
            {{ child.name }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
</template>

<script>
export default {
  props: {
    navItems: {
      type: Array,
      required: true,
    },
    isActive: {
      type: Boolean,
    }
  },
};
</script>

<style scoped src='./index.scss' lang="scss"></style>
