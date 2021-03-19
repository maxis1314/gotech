<template>
  <div class="container">
    {{ listName }}<br>
    
    <div class="row mb-3">
      <create-todo @on-new-todo="addTodo($event)" />
    </div>
    <div class="row">
      <div class="col-12 col-sm-10 col-lg-6">
        <ul class="list-group">
          <todo
            v-for="(todo, index) in todos"
            :key="index"
            :description="todo.description"
            :completed="todo.completed"
            @on-toggle="toggleTodo(todo)"
            @on-delete="deleteTodo(todo)"
            @on-edit="editTodo(todo, $event)"
          />
        </ul>
      </div>
    </div>
<br>
    <el-upload
  :show-file-list="false"
  action="/todolist/upload"
  :on-success="handleUploadSuccess"
  :before-upload="handleBeforeUpload"
  :file-list="fileList"
  list-type="picture">
  <el-button icon="el-icon-upload2" type="primary"></el-button>
   </el-upload>


  </div>
</template>

<script>
import axios from 'axios'
import Todo from "./Todo.vue";
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
    };
  },
  methods: {
    refreshTodo(){
      axios({
           url: '/todolist',
           method: 'get',
           data: {},
      }).then((res) => {
           console.log(res)
           this.todos = res.data.data
      })
    },
    addTodo(newTodo) {
      axios({
           url: '/todolist',
           method: 'post',
           data: {description: newTodo, completed: false},
      }).then((res) => {
           console.log(res)
           this.todos.unshift(res.data.data);
      })
    },
    toggleTodo(todo) {
      todo.completed = !todo.completed;
      axios({
           url: '/todolist/'+todo.id,
           method: 'put',
           data: todo,
      }).then((res) => {
           console.log(res)
      })

    },
    deleteTodo(deletedTodo) {
      this.todos = this.todos.filter(todo => todo !== deletedTodo);
      axios({
           url: '/todolist/'+deletedTodo.id,
           method: 'delete',
           data: {},
      }).then((res) => {
           console.log(res)
      })
    },
    editTodo(todo, newTodoDescription) {
      todo.description = newTodoDescription;
      axios({
           url: '/todolist/'+todo.id,
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
