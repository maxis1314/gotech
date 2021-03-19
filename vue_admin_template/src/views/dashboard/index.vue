<template>
  <div class="dashboard-container">
    <div class="dashboard-text">Welcome {{ name }}!</div>

    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="修改密码">
        <el-input v-model="form.password" type="password" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改密码</el-button>
      </el-form-item>
    </el-form>


    <el-link :underline="false" href="/refresh_pics">Refresh Pics</el-link>

<!--
<div id='myChart' style='width：300px;height:300px'></div>
    <el-link :underline="false" href="/cron_job/doit?name=sql">sql</el-link>
    <el-link :underline="false" href="/cron_job/doit?name=iris">iris</el-link>
    <el-link :underline="false" href="/cron_job/doit?name=crawler">crawler</el-link>
    <el-link :underline="false" href="/cron_job/doit?name=intel">intel</el-link>
-->

  </div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
import {mavonEditor} from "mavon-editor";
import "mavon-editor/dist/css/index.css";

import request from '@/utils/request'
import { mapGetters } from 'vuex'

export default {
  components: {mavonEditor},
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      form: {
        password: ''
      },
      content: '',
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {
    onSubmit(queryString, cb) {
      request({
        url: '/auth_center/password',
        method: 'post',
        data: this.form
      }).then(response => {
        this.loading = false
        this.$notify({
          title: 'Success',
          message: 'Updated successfully!',
          type: 'success'
        })
        this.form.password = ''
      })
    },
   
    drawLine(){
        axios({
           url: '/log/upload',
           method: 'get',
           data: {},   
        }).then((url) => {
           console.log(url)
           // 基于准备好的dom，初始化echarts实例
           let myChart = echarts.init(document.getElementById('myChart'))
           // 绘制图表
           
           myChart.setOption(url.data)

           /*
           myChart.setOption({
             title: { text: '在Vue中使用echarts' },
             tooltip: {},
             xAxis: {
                 data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
             },
             yAxis: {},
             series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
             }]
           });*/
           
        })
   },


  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
