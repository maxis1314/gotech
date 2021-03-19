<template>
  <div class="container">
    {{ listName }}<br>
    
    <div class="row">
      <create-todo @on-new-todo="addTodo($event)" />
    </div>
      <el-row>
      <el-col :span="10"><el-input v-model="input" label="检索" placeholder="请输入内容" clearable @keyup.enter.native="refreshTodo" /></el-col>
      <el-col :span="10"><el-button type="primary" icon="el-icon-search" @click="refreshTodo"></el-button></el-col>
      </el-row>

    <div class="row">
      <div class="col-12 col-sm-10 col-lg-6">
        <ul class="list-group">
          <todo
            v-for="(todo, index) in todos"
            :key="index"
            :description="todo.title"
            :completed="false"
            @on-toggle="toggleTodo(todo)"
            @on-delete="deleteTodo(todo)"
          />
        </ul>
      </div>
    </div>

<br>
  </div>
</template>

<script>
import axios from 'axios'
import Todo from "./Todo2.vue";
import CreateTodo from "./CreateTodo.vue";

export default {
  created() {
    this.refreshTodo()
  },
  props: {
    listName: String,
  },
  data() {
    return {
      todos: [
      ],
      input: "",
    };
  },
  methods: {
    refreshTodo(){
      axios({
           url: '/todo2',
           method: 'get',
           params: {key: this.input},
      }).then((res) => {
           console.log(res)
           this.todos = res.data.data
      })
    },
    addTodo(newTodo) {
      axios({
           url: '/todo2',
           method: 'post',
           data: {title: newTodo, tag: ""},
      }).then((res) => {
           console.log(res)
           this.todos.unshift(res.data.data);
      })
    },
    toggleTodo(todo) {
      return
      todo.completed = !todo.completed;
      axios({
           url: '/todo2/'+todo.id,
           method: 'put',
           data: todo,
      }).then((res) => {
           console.log(res)
      })

    },
    deleteTodo(deletedTodo) {
      return
      this.todos = this.todos.filter(todo => todo !== deletedTodo);
      axios({
           url: '/todo2/'+deletedTodo.id,
           method: 'delete',
           data: {},
      }).then((res) => {
           console.log(res)
      })
    },
    editTodo(todo, newTodoDescription) {
      return
      todo.description = newTodoDescription;
      axios({
           url: '/todo2/'+todo.id,
           method: 'put',
           data: {description: newTodoDescription, completed: todo.completed},
      }).then((res) => {
           console.log(res)
      })
     
    },
    handleBeforeUpload(){
    },
    handleUploadSuccess(res){
        console.log(res)
        var obj = {
          id: 999999
          ,description: res
          ,completed: false
        }  
        this.todos.unshift(obj);
        this.$message({
          showClose: true,
          title: "Up",
          message: "OK",
          type: "success"
      })
    },
  },
  components: { Todo, CreateTodo },
};
</script>

<style scoped lang="scss"></style>
