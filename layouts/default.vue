<template>
  <div class="layout">
    <Header class="header" @toFooter="scrollToFooter" />
      <div class="content">
        <slot />
      </div>
  </div>
</template>

<style scoped lang="scss">
  .layout {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    width: 100dvw;
    min-height: 100dvh;
    overflow: hidden;
  }

  .content{
    flex: 1;
  }
</style>
