<template>
  <nav>
      <div class="nav-wrapper red darken-4">
        <div class="container">
          <a href="#" class="brand-logo">Поликлиника</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a @click="$router.push(`/`)">Зарегистрировать</a></li>
            <li><a @click="$router.push(`/recognize`)">Разпознать</a></li>
          </ul>
        </div>
      </div>
  </nav>
  <div class="app">
    <router-view>

    </router-view>
  </div>
</template>

<script>
import M from "materialize-css/dist/js/materialize"

export default {
  name: "App",
  mounted() {
    M.AutoInit();
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
