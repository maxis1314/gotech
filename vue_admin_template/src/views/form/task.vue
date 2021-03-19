<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="task">
        <el-input v-model="form.task" type="textarea" />
      </el-form-item>

      <el-form-item label="date">
        <el-date-picker v-model="form.date" value-format="yyyy-MM-dd" type="date" placeholder="Pick a date" style="width: 100%;" />
      </el-form-item>
      <!--
      <el-form-item label="Tag">
        <el-autocomplete
          v-model="tag"
          class="inline-input"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        />
      </el-form-item>
-->
      <el-form-item>
        <el-button v-loading="loading" type="primary" @click="onSubmit">{{ label_name }}</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from '@/utils/request'
/* import { getList } from '@/api/table'*/

export default {
  data() {
    return {
      form: {
        task: '',
        date: '',
        id: ''
      },
      loading: false,
      label_name: 'Create',
      tag: '',
      taglist: []
    }
  },
  watch: {
    '$route': 'getParams'
  },
  created() {
    this.getParams()
    request({
      url: '/tags',
      method: 'get'
    }).then(response => {
      console.log(response.data)
      this.taglist = response.data
    })
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.taglist
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      console.log(item)
    },
    getParams() {
      // 取到路由带过来的参数
      this.id = this.$route.query.id
      if (this.id) {
        this.label_name = 'Update'
        request({
          url: '/todos/' + this.id,
          method: 'get'
        }).then(response => {
          console.log(response.data)
          this.form.task = response.data.task
          this.form.date = response.data.date
        })
      }
    },
    update_todo() {
      this.loading = true
      request({
        url: '/todos/' + this.id,
        method: 'put',
        data: { task: this.form.task, date: this.form.date }
      }).then(response => {
        this.loading = false
        this.$notify({
          title: 'Success',
          message: 'Updated successfully!',
          type: 'success'
        })
        this.$router.push({ path: '/example/table' })
      })
    },
    create_todo() {
      this.loading = true
      request({
        url: '/todos',
        method: 'post',
        data: { task: this.form.task, date: this.form.date }
      }).then(response => {
        this.loading = false
        this.$notify({
          title: 'Success',
          message: 'Add successfully!',
          type: 'success'
        })
        this.$router.push({ path: '/example/table' })
      })
    },
    onSubmit() {
      if (this.id) {
        this.update_todo()
      } else {
        this.create_todo()
      }

      /*
      this.$axios({
        method: 'post',
        url: 'http://localhost:5000/todos',
        data: { task: this.form.task, date: this.form.date }
      }).then(response => {
        console.log(response.data)
        this.$notify({
          title: 'Success',
          message: 'Add successfully!',
          type: 'success'
        })

        this.loading = false
        // this.$router.push('/exmaple/table/')
        // this.$router.push('/home/first')

        this.$router.push({ path: '/example/table' })
        // this.$router.push({ name: 'Table', params: { userId: 1 }})
      })*/
    },
    onCancel() {
      this.$router.go(-1)
      /* this.$message({
        message: 'cancel!',
        type: 'warning'
      })*/
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

