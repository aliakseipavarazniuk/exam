<template>
  <div id="app">
    <Characters />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Characters from "./components/Characters.vue";

@Component({
  components: {
    Characters,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400&display=swap");

#app {
  font-family: Poppins, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;

  @media (max-width: 1000px) {
    margin-top: 0;
  }

  .filter-open {
    box-shadow: none;
    border: 1px solid #a9b1bd;
    border-top: none;
    border-radius: 0 0 12px 12px;

    .v-list {
      padding: 0;

      .v-list-item {
        border-top: 1px solid #a9b1bd;
        text-align: start;
        padding: 5px 25px;

        @media (max-width: 750px) {
          padding: 5px 10px;
        }

        .v-list-item__title {
          font-size: 16px;
          color: #a9b1bd;
          font-weight: 300;
        }
      }
    }
  }
}
</style>
