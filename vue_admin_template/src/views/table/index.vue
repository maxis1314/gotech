<template>
  <div class="app-container">

    <el-row>
      <el-col :span="12"><el-input v-model="input" label="检索" placeholder="请输入内容" clearable @keyup.enter.native="refresh" /></el-col>
      <el-col :span="12"><el-button type="primary" icon="el-icon-search" @click="refresh">搜索</el-button></el-col>
    </el-row>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Name" width="110">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="Task" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.task }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-edit" @click="toDetailPage(scope.row.id)">查看</el-button>

          <el-popconfirm
            title="确定删除吗？"
            @onConfirm="handleDelete(scope.$index,scope.row)"
          >
            <el-button slot="reference" type="text" size="small" icon="el-icon-delete">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 50, 100, 500]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

  </div>
</template>

<script>
import request from '@/utils/request'

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
      totalCount: 400
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSizeChange(val) {
      console.log(val)
      this.pageSize = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage = val
      this.fetchData()
    },
    toDetailPage(id) {
      this.$router.push({
        path: '/example/form',
        query: {
          id: id
        }
      })
    },
    handleDelete(index, row) {
      request({
        url: '/todos/' + row.id,
        method: 'delete'
      }).then(response => {
        this.list.splice(index, 1)
        console.log(index)
        // 输出接口数据
        console.log(response.data)
        this.$notify({
          title: 'Success',
          message: 'Deleted successfully!',
          type: 'success'
        })
        this.fetchData()
      })
    },

    fetchData() {
      this.listLoading = true
      request({
        url: '/todos',
        method: 'get',
        params: { currentPage: this.currentPage, pageSize: this.pageSize, key: this.input }
      }).then(response => {
        this.list = response.data
        this.totalCount = response.total
        console.log(this.totalCount)
        console.log(response.data)
        this.listLoading = false
      })
    },
    refresh() {
      this.currentPage = 1
      if (!this.input) {
        this.fetchData()
      } else {
        this.fetchData()
      }
    },
    search() {
      this.listLoading = true
      request({
        url: '/todos/search/' + this.input,
        method: 'get'
      }).then(response => {
        this.list = response.data
        console.log(response.data)
        this.listLoading = false
      })
    }

  }
}
</script>
