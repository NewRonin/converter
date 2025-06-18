<template>
  <header>
    <nav>
      <div class="links">
        <div
          v-for="link in links"
          :class="[link.enabled || link.custom ? 'link' : 'link-disabled']"
          @click="headerClickHandler($event, link)"
        >
          <NuxtLink
            v-if="!link.custom"
            :to="link.link"
          >
            {{ link.name }}
          </NuxtLink>

          <div v-else>
            {{ link.name }}
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">

const links: HeaderLink[] = [
  { name: "Главная", link: "/", enabled: true },
  { name: "Конвертер", link: "/convert", enabled: true },
];
</script>

<style scoped lang="scss">
header {
  width: 100%;
  height: 10rem;
  overflow-x: hidden;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 1400px) {
    justify-content: flex-start;
  }

  nav {
    z-index: 100;
    position: fixed;
    width: 138rem;
    padding: 2rem 6.4rem;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    border-radius: 0 0 2rem 2rem;
    background: var(--background);
    color: var(--primary-dark);

    -webkit-box-shadow: 0px 4px 4px 0px #00000040;
    -moz-box-shadow: 0px 4px 4px 0px #00000040;
    box-shadow: 0px 4px 4px 0px #00000040;

    @media (max-width: 1400px) {
      width: 100%;
    }

    @media (max-width: 833px) {
      padding: 2rem;
    }
  }
}

.logo {
  width: auto;
  height: 4rem;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(13%) sepia(1%) saturate(0%)
    hue-rotate(116deg) brightness(97%) contrast(97%);
  user-select: none;

  @media (max-width: 833px) {
    height: 2rem;
  }
}

.links {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 5.6rem;

  font-size: 1.6rem;
  font-weight: 600;

  @media (max-width: 833px) {
    display: none;
  }
}

.link {
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  @include hover {
    color: var(--main);
    cursor: pointer;
  }

  @media (max-width: 833px) {
    position: relative;
    width: 100%;
    text-align: center;

    &:not(:last-child)::after {
      content: '';
      position: absolute;
      display: block;
      bottom: -2.4rem;
      left: 50%;
      transform: translate(-50%, 0);
      width: 90%;
      height: .1rem;
      background-color: var(--primary-dark);
      opacity: 0.15;
      border-radius: 95px;
    }
  }
}

.link-disabled {
  display: none;
}
</style>
