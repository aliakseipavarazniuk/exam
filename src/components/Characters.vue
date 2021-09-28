<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Installed CLI Plugins</h3>
    <button @click="click()">CLICK</button>
    {{ list }}
  </div>
</template>

<script lang="ts">
import axios from "axios";

export default {
  name: "Characters",
  props: ["msg"],
  data: () => ({
    list: [],
  }),
  methods: {
    click() {
      return axios
        .get("https://rickandmortyapi.com/api/character")
        .then((response) => {
          console.log("response", response);
          this.list = response.data.results;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
