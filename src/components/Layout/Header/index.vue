<template>
  <header >
    <div class="layout-header">
      <NuxtLink to="/"  >
        <LayoutHeaderLogo />
      </NuxtLink>

      <div class="layout-header__actions">
        <slot name="actions" />
      </div>
    </div>
    <div class="layout-header__menu">
      <slot name="navigation" />
    </div>
  </header>
</template>

<style scoped src='./index.scss' lang="scss"></style>
