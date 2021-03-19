<template>
  <todo-list list-name="" />
</template>

<script>
import TodoList from "./components/TodoList2.vue";

export default {
  name: "App",
  components: {
    TodoList,
  },
};
</script>

<style lang="scss">
@import "/static/my/all.min.css";
@import "/static/my/bootstrap.min.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
