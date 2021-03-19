<template>
  <div class="app-container">

    <el-row>
      <el-col :span="12"><el-input v-model="input" label="检索" placeholder="请输入内容" clearable @keyup.enter.native="refresh" /></el-col>
      <el-col :span="6"><el-button type="primary" icon="el-icon-search" @click="refresh" /></el-col>
      <el-col :span="3" align="right"><el-button type="primary" icon="el-icon-download" @click="download()" /></el-col>
      <el-col :span="3" align="right"><el-button type="primary" icon="el-icon-plus" @click="show_dialog()" /></el-col>
    </el-row>

    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="item in list" :title="'['+item.id +'] '+ item.title" name="1">
        <div><pre>{{ item.task }}</pre></div>
        <el-button type="text" size="small" icon="el-icon-edit" @click="show_dialog(item)">编辑</el-button>
      </el-collapse-item>

    </el-collapse>
    <p slot="append" v-loading="listLoading" style="text-align:center; line-height:50px;"><a href="javascript:;" class="blue01" @click="load()">点击加载更多</a></p>

    <el-dialog title="Task" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form">
        <el-form-item label="Title">
          <el-input v-model="form.title" autocomplete="off" @keyup.enter.native="do_submit" />
        </el-form-item>

        <el-form-item label="Task">
          <el-input v-model="form.task" type="textarea" :autosize="{ minRows: 5, maxRows: 5}" autocomplete="off" />
        </el-form-item>

        <el-form-item label="Tag">
          <el-input v-model="form.tag" autocomplete="off" @keyup.enter.native="do_submit" />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-loading="loading" type="primary" @click="do_submit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

import { download, show_dialog, do_submit, update_item, create_item, handleSizeChange, handleCurrentChange, handleDelete, fetchData, refresh } from '@/utils/common_list'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      input: '',
      currentPage: 1,
      pageSize: 10,
      totalCount: 400,
      dialogFormVisible: false,
      form: {
        task: '',
        tag: '',
        title: ''
      },
      id: '',
      loading: false,
      table_name: 'task',
      activeNames: ['1']
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    download,
    show_dialog,
    do_submit,
    update_item,
    create_item,
    handleSizeChange,
    handleCurrentChange,
    handleDelete,
    fetchData,
    refresh,
    load() {
      this.currentPage = 1
      this.pageSize += 10
      console.log('more')

      this.fetchData()
    }
  }
}
</script>

<style>
pre{
white-space: pre-wrap; /* css-3 */
white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
white-space: -pre-wrap; /* Opera 4-6 */
white-space: -o-pre-wrap; /* Opera 7 */
word-wrap: break-word; /* Internet Explorer 5.5+ */
font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
font-size: 14px;
color: #606266;
}
</style>
