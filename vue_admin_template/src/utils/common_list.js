import request from '@/utils/request'
import Sortable from 'sortablejs'

Date.prototype.Format = function(fmt) { // author: meizz
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  return fmt
}

export function show_alert(message, type, title=''){
   if(type){
      this.$message({
          showClose: true,
          title: title,
          message: message,
          type: type
      })
   }else{
      this.$message(message);
   }
}

export function download() {
  request({
    url: '/' + this.table_name,
    method: 'get',
    responseType: 'blob',
    params: {download_file: 1 , currentPage: this.currentPage, pageSize: this.pageSize, key: this.input }
  }).then(response => {
    console.log(response)
    if(response.size < 2048){
        this.show_alert('Permission denied!','warning')
    }else{
        console.log(response)
        const blob = new Blob([response], { type: 'application/xlxs' })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = this.table_name + new Date().Format('yyyyMMdd_hhmmss') + '.xlsx'
        link.click()
        URL.revokeObjectURL(link.href)
    }
  })
}

export function download_id(id) {
  request({
    url: '/' + this.table_name+"/"+id,
    method: 'get',
    responseType: 'blob',
    params: {download_file: 1 }
  }).then(response => {
    console.log(response)
    const blob = new Blob([response], { type: 'application/text' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = this.table_name + id +"_" +new Date().Format('yyyyMMdd_hhmmss') + '.txt'
    link.click()
    URL.revokeObjectURL(link.href)
  })
}




export function show_dialog(row,copy=0) {
  if (row) {
    if(copy==0){
    	this.id = row.id
    }else{
        this.id = ''
    }
    this.form = row
    this.form["goon"] = false
  } else {
    this.id = ''
    this.form = {goon:false}
  }
  this.dialogFormVisible = true
}
export function do_submit() {
  if (this.id) {
    this.update_item()
  } else {
    this.create_item()
  }
}
export function update_item() {
  this.loading = true
  request({
    url: '/' + this.table_name + '/' + this.id,
    method: 'put',
    data: this.form
  }).then(response => {
    if(response.code == 20000){
        if(!this.form.goon){
           this.dialogFormVisible = false
        }
        this.loading = false
        this.show_alert(response.message,'success')
        this.form = {goon:false}
    }else{
        this.loading = false
        this.show_alert(response.message,'warning')
    }
    this.fetchData()
  })
}
export function create_item() {
  this.loading = true
  request({
    url: '/' + this.table_name,
    method: 'post',
    data: this.form
  }).then(response => {
    if(response.code == 20000){
        this.loading = false
        if(!this.form.goon){
           this.dialogFormVisible = false
        }else{
           this.form = {goon:true}
        }
        this.show_alert(response.message,'success')
        this.form = {goon:false}
        this.fetchData()
    }else{
        this.loading = false
        this.show_alert(response.message,'warning')
    }
  })
}
export function handleSizeChange(val) {
  console.log(val)
  this.pageSize = val
  this.fetchData()
}
export function handleCurrentChange(val) {
  console.log(val)
  //this.$refs.table.bodyWrapper.scrollTop =0;
  this.$refs.tableList.bodyWrapper.scrollTop =0;
  this.$refs.tableListFlat.bodyWrapper.scrollTop =0;
  this.currentPage = val
  this.fetchData()
}

export function handleDelete(index, row) {
  if(index != -1){
     this.list.splice(index, 1)
     this.totalCount = this.totalCount -1
  }
  request({
    url: '/' + this.table_name + '/' + row.id,
    method: 'delete'
  }).then(response => {
    if(response.code == 20000){
        if(index != -1){
         //this.list.splice(index, 1)
         //this.totalCount = this.totalCount -1        
         console.log(index)
         // 输出接口数据
         console.log(response.data)
         this.show_alert(response.message,'success')
         if(this.list.length < 2){
             this.fetchData()
         }
        }
    }else{
        this.show_alert(response.message,'warning')
    }
  })
}

export function handleCustom(index, row) {
  request({
    url: '/' + this.table_name + '/customize/' + row.id,
    method: 'post'
  }).then(response => {
    if(response.code == 20000){
        if(index != -1){
         this.list.splice(index, 1)
        
         console.log(index)
         // 输出接口数据
         console.log(response.data)
         this.show_alert(response.message,'success')
         if(this.list.length < 1){
             this.fetchData()
         }
        }
    }else{
        this.show_alert(response.message,'warning')
    }
  })
}




export function fetchData(append=false) {
  this.listLoading = true
  this.append = append
  request({
    url: '/' + this.table_name,
    method: 'get',
    params: { currentPage: this.currentPage, pageSize: this.pageSize, key: this.input }
  }).then(response => {
    if(this.append){
        if(response.data.length == 0){
          this.show_alert("No more data",'')
        }
        this.list = this.list.concat(response.data)
    }else{
        this.list = response.data
    }
    this.totalCount = response.total
    console.log(this.totalCount)
    console.log(response.data)
    this.listLoading = false
    if(this.list.length>0 && this.list[0].hasOwnProperty('prinum')){
    this.itemKey = Math.random()
       setTimeout(() => {
        //this.itemKey = Math.random()
        this.rowDrop()
       }, 5);
    }
  })
}
export function refresh() {
  this.currentPage = 1
  if (!this.input) {
    this.fetchData()
  } else {
    this.fetchData()
  }
}


export function goPath(path,query){
   this.$router.push({
     path:path,
     query:query
   })
}

export function rowDrop() {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      console.log(tbody)
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          console.log([newIndex, oldIndex])
          const new_line = _this.list[newIndex]
          const old_line = _this.list[oldIndex]
          console.log([new_line, old_line])
          if(new_line.hasOwnProperty('prinum')){
              console.log("start update")
              //const temp = new_line.prinum
              //new_line.prinum = old_line.prinum
              //old_line.prinum = temp
              request({
                 url: '/change_pri',
                 method: 'post',
                 data: {table: _this.table_name, newid: new_line.id, oldid: old_line.id}
              }).then(response => {
                  console.log("new updated")
              })
          }else{
              console.log("ng")
          }

          var i = 0
          //const currRow = _this.list.splice(oldIndex, 1)[0]
          //_this.list.splice(newIndex, 0, currRow)
          //for (i=0;i<_this.list.length;i++){console.log(_this.list[i].id)}
          setTimeout(() => {
             this.itemKey = Math.random()
             //_this.refresh()
          }, 3000);
 
        }
      })
}
