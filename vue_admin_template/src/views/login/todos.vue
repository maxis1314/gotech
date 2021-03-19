<template>
  <div style="width:800px">

    <el-table :data="tableData"
      border
      row-key="id"
      align="left">
     <el-table-column
        label="id">
         <template slot-scope="scope"><span v-html="scope.row.id"></span>
     </el-table-column>
 
     <el-table-column
        label="aaa"> 
         <template slot-scope="scope"><span v-html="scope.row.address"></span>
     </el-table-column>
     <el-table-column
        prop="name"
        label="aa2"> 
     </el-table-column>
 
    </el-table>
  </div>

</template>
<script>
import Sortable from 'sortablejs'
export default {
  data() {
    return {
      tableData: [
        {
          id: '1',
          date: '2016-05-02',
          name: '王小虎1',
          address: '上海市普陀区金沙江路 100 弄'
        },
        {
          id: '2',
          date: '2016-05-04',
          name: '王小虎2',
          address: '上海市普陀区金沙江路 200 弄'
        },
        {
          id: '3',
          date: '2016-05-01',
          name: '王小虎3',
          address: '上海市普陀区金沙江路 300 弄'
        },
        {
          id: '4',
          date: '2016-05-03',
          name: '王小虎4',
          address: '上海市普陀区金沙江路 400 弄'
        }
      ]
    }
  },
  mounted() {
    this.rowDrop()
  },
  methods: {
    //行拖拽
    rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          console.log([newIndex, oldIndex])
          _this.tableData[newIndex].address = Math.random()
          const currRow = _this.tableData.splice(oldIndex, 1)[0]
          _this.tableData.splice(newIndex, 0, currRow)
        }
      })
    },
  }
}
</script>
<style scoped>
</style>
