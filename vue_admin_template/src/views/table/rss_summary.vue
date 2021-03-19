<template>
  <div class="app-container">

    <el-row>

      <el-col :span="6"><el-input v-model="input" label="检索" placeholder="请输入内容" clearable @keyup.enter.native="refresh" /></el-col>
      <el-col :span="5"><el-button type="primary" icon="el-icon-search" @click="refresh"></el-button></el-col>
      <el-col :span="9">

      <el-button type="primary" icon="el-icon-plus" @click="show_dialog()"></el-button>
      <el-button type="primary" icon="el-icon-download" @click="download()"></el-button>

</el-col>
<el-col :span="4" align="right">
<el-upload
  :show-file-list="false"
  action="/rss_summary/upload"
  :on-success="handleUploadSuccess"
  :before-upload="handleBeforeUpload"
  :file-list="fileList"
  list-type="picture">
  <el-button icon="el-icon-upload2" type="primary"></el-button>
</el-upload>
</el-col>

    </el-row>

<el-tabs v-model="activeName"  @tab-click="handleClick" ref="table">
    <el-tab-pane label="Table" name="first">

    <el-button type="danger" v-if="multipleSelectionFlag" @click="multiDeleteVisible = true">批量删除</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      ref="tableList"
      :key="itemKey"
      element-loading-text="Loading"
      height="680"
      border
      fit
      @selection-change="handleSelectionChange"
    >

      <el-table-column type="selection" width="55" align="center" className="my-cell"></el-table-column>

      <el-table-column align="center" label="ID" width="95" className="my-cell" sortable prop="id">
        <template slot-scope="scope">
           <el-link :underline="false" @click="show_drawer(scope.row)">{{ scope.row.id }}</el-link>
           <el-link :underline="false" @click="download_id(scope.row.id)"></el-link>
        </template>
      </el-table-column>
      
      
               <el-table-column label="Name"   width="" className="my-cell">
               <template slot-scope="scope"><!-- <span v-html="showHighlight(scope.row.name)"></span> -->
            <no-ssr>
               <mavon-editor
                v-model="scope.row.name"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
    </template>
               </el-table-column>
            

               <el-table-column label="Tfidf"   width="95" className="my-cell" sortable prop="tfidf">
               <template slot-scope="scope"><span v-html="showHighlight(scope.row.tfidf)"></span>
         <!--
            <no-ssr>
               <mavon-editor
                v-model="scope.row.tfidf"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
         -->

    </template>
               </el-table-column>
            

               <el-table-column label="Num"   width="95" className="my-cell" sortable prop="num">
               <template slot-scope="scope"><span v-html="showHighlight(scope.row.num)"></span>
         <!--
            <no-ssr>
               <mavon-editor
                v-model="scope.row.num"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
         -->

    </template>
               </el-table-column>
            

      <el-table-column align="center" label="操作" width="170" fixed="right" className="my-cell">
        <template slot-scope="scope">
          <el-button type="text" size="small" icon="el-icon-edit" @click="show_dialog(scope.row)">编辑</el-button>
          <el-button type="text" size="small" icon="el-icon-document-copy" @click="show_dialog(scope.row,1)">复制</el-button>
          <el-popconfirm
            title="确定删除吗？"
            @onConfirm="handleDelete(scope.$index,scope.row)"
          >
            <el-button slot="reference" type="text" size="small" icon="el-icon-delete">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>

    </el-table>

    <el-button type="danger" v-if="multipleSelectionFlag" @click="multiDeleteVisible = true">批量删除</el-button>
    <el-dialog :visible.sync="multiDeleteVisible" title="提示" width="30%">
        <span>确定要删除吗</span>
        <span slot="footer">
          <el-button type="primary" @click="multiDelete">确 定</el-button>
          <el-button @click="multiDeleteVisible = false">取 消</el-button>
        </span>
    </el-dialog>

     <el-pagination
      background
      :current-page="currentPage"
      :page-sizes="[10, 20,30,40,50,80, 100,200,300,400,500]"
      :page-size="30"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />


    </el-tab-pane>


    <el-tab-pane label="Flat" name="sixth">

    <el-table
      v-loading="listLoading"
      :data="list"
      ref="tableListFlat"
      element-loading-text="Loading"
      height="680"
      fit
      @selection-change="handleSelectionChange"
    >


      <el-table-column align="left" label="List" className="my-cell">
        <template slot-scope="scope">        
       
         <el-button type="success" plain size="medium" icon="el-icon-delete" @click="handleDelete(scope.$index,scope.row)">直接删除</el-button> 
         <el-button type="success" plain size="medium" icon="el-icon-s-custom" @click="handleCustom(scope.$index,scope.row)">OPTION</el-button>
        
        
            <div><!-- <el-tag type="success" size="mini">Name</el-tag><br> -->
            <!--<span v-html="showHighlight(scope.row.name)"></span>-->
         <no-ssr>
               <mavon-editor
                v-model="scope.row.name"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
    
            </div>
            

            <div><!-- <el-tag type="success" size="mini">Tfidf</el-tag><br>-->
            <span v-html="showHighlight(scope.row.tfidf)"></span>
        <!--
         <no-ssr>
               <mavon-editor
                v-model="scope.row.tfidf"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
        -->
    
            </div>
            

            <div><!-- <el-tag type="success" size="mini">Num</el-tag><br>-->
            <span v-html="showHighlight(scope.row.num)"></span>
        <!--
         <no-ssr>
               <mavon-editor
                v-model="scope.row.num"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
        -->
    
            </div>
            
       
         <el-button type="success" plain size="medium" icon="el-icon-delete" @click="handleDelete(scope.$index,scope.row)">直接删除</el-button> 
         <el-button type="success" plain size="medium" icon="el-icon-s-custom" @click="handleCustom(scope.$index,scope.row)">OPTION</el-button>
        
       <!--  <el-button type="text" size="small" icon="el-icon-view" @click="show_drawer(scope.row)">详情</el-button>
        <el-button type="text" size="small" icon="el-icon-document-copy" @click="show_dialog(scope.row,1)">复制</el-button>
        <el-button type="text" size="small" icon="el-icon-edit" @click="show_dialog(scope.row)">编辑</el-button>
        <el-button type="text" size="small" icon="el-icon-connection" @click="goPath('/permission/info',{'key':scope.row.name})">RELATION</el-button>
        <el-button type="text" size="small" icon="el-icon-s-custom" @click="handleCustom(scope.$index,scope.row)">OPTION</el-button>
         <el-popconfirm
            title="确定删除吗？"
            @onConfirm="handleDelete(scope.$index,scope.row)"
         >
           <el-button slot="reference" type="text" size="small" icon="el-icon-delete">删除</el-button>
         </el-popconfirm>
        -->

       </template>
      </el-table-column>

    </el-table>

     <el-pagination
      background
      :current-page="currentPage"
      :page-sizes="[10, 20,30,40,50,80, 100,200,300,400,500]"
      :page-size="30"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />


    </el-tab-pane>




    <el-tab-pane label="Load" name="second">

    <p  style="text-align:center; line-height:10px;">{{ totalCount }}</p>
      <el-collapse v-model="activeName2" v-loading="listLoading">
      <el-collapse-item v-for="(item,index) in list" :title="'['+item.id +']'"  name="1">
        
         <el-button type="success" plain size="medium" icon="el-icon-delete" @click="handleDelete(index,item)">直接删除</el-button> 
         <el-button type="success" plain size="medium" icon="el-icon-s-custom" @click="handleCustom(index,item)">OPTION</el-button>
        
        
            <div><el-tag type="success" size="mini">Name</el-tag><br>
            <!--<span v-html="showHighlight(item.name)"></span>-->
         <no-ssr>
               <mavon-editor
                v-model="item.name"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
    
            </div>
            

            <div><el-tag type="success" size="mini">Tfidf</el-tag><br>
            <span v-html="showHighlight(item.tfidf)"></span>
        <!--
         <no-ssr>
               <mavon-editor
                v-model="item.tfidf"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
        -->
    
            </div>
            

            <div><el-tag type="success" size="mini">Num</el-tag><br>
            <span v-html="showHighlight(item.num)"></span>
        <!--
         <no-ssr>
               <mavon-editor
                v-model="item.num"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
        -->
    
            </div>
            
        <el-button type="text" size="small" icon="el-icon-view" @click="show_drawer(item)">详情</el-button>
        <el-button type="text" size="small" icon="el-icon-document-copy" @click="show_dialog(item,1)">复制</el-button>
        <el-button type="text" size="small" icon="el-icon-edit" @click="show_dialog(item)">编辑</el-button>
        <el-button type="text" size="small" icon="el-icon-connection" @click="goPath('/permission/info',{'key':item.name})">RELATION</el-button>
        <el-button type="text" size="small" icon="el-icon-s-custom" @click="handleCustom(index,item)">OPTION</el-button>
        
         <el-button type="text" size="small" icon="el-icon-delete" @click="handleDelete(index,item)">直接删除</el-button> 
        
 
      </el-collapse-item>

    </el-collapse>
    <p   v-loading="listLoading"  style="text-align:center; line-height:50px;"><a href="javascript:;" class="blue01" @click="load()">点击加载更多({{ totalCount - list.length }})</a></p>
    </el-tab-pane>


     <el-tab-pane label="Card" name="third">
    <el-carousel trigger="click" arrow="always" :autoplay="false" indicator-position="none"  v-loading="listLoading">
     <el-carousel-item v-for="item in list" :key="item">
       <span  class="medium">
          <div><el-tag type="success" size="mini">ID</el-tag><span v-html="showHighlight(item.id)" @click="show_drawer(item)" ></span></div>
          
            <div><el-tag type="success" size="mini">Name</el-tag><br>
            <!--<span v-html="showHighlight(item.name)"></span>-->
         <no-ssr>
               <mavon-editor
                v-model="item.name"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
    
            </div>
            

            <div><el-tag type="success" size="mini">Tfidf</el-tag><br>
            <span v-html="showHighlight(item.tfidf)"></span>
        <!--
         <no-ssr>
               <mavon-editor
                v-model="item.tfidf"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
        -->
    
            </div>
            

            <div><el-tag type="success" size="mini">Num</el-tag><br>
            <span v-html="showHighlight(item.num)"></span>
        <!--
         <no-ssr>
               <mavon-editor
                v-model="item.num"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
        -->
    
            </div>
            
       </span>
     </el-carousel-item>
    </el-carousel>
    
     <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 50, 100, 500]"
      :page-size="30"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

     
    </el-tab-pane>
 
     <el-tab-pane label="Graph" name="fourth">
      <div id='myChart_rss_summary' style='width：600px;height:600px'></div>     
    </el-tab-pane>
   

     <el-tab-pane label="Form" name="fifth">
 
        <el-form :model="form"  label-width="100px">
        
            <el-form-item label="Name">
               <el-input v-model="form.name" autocomplete="off" type="" :autosize="{ minRows: 2, maxRows: 3}" @keyup.enter.native="do_submit" />
        <!--
        <div><mavon-editor  ref=md  v-model="form.name" @imgAdd="$imgAdd"  @save="saveDoc" /></div>
        -->
    
            </el-form-item>
            

            <el-form-item label="Tfidf">
               <el-input v-model="form.tfidf" autocomplete="off" type="" :autosize="{ minRows: 2, maxRows: 3}" @keyup.enter.native="do_submit" />
        <!--
        <div><mavon-editor  ref=md  v-model="form.tfidf" @imgAdd="$imgAdd"  @save="saveDoc" /></div>
        -->
    
            </el-form-item>
            

            <el-form-item label="Num">
               <el-input v-model="form.num" autocomplete="off" type="" :autosize="{ minRows: 2, maxRows: 3}" @keyup.enter.native="do_submit" />
        <!--
        <div><mavon-editor  ref=md  v-model="form.num" @imgAdd="$imgAdd"  @save="saveDoc" /></div>
        -->
    
            </el-form-item>
            

        <el-form-item label="">  <el-button type="primary" @click="do_submit">确 定</el-button> </el-form-item>


      </el-form>

      <p  style="text-align:center; line-height:10px;">{{ totalCount }}</p>
      <el-collapse v-model="activeName2" v-loading="listLoading">
      <el-collapse-item v-for="(item,index) in list" :title="'['+item.id +']'"  name="1">
        
         <el-button type="success" plain size="medium" icon="el-icon-delete" @click="handleDelete(index,item)">直接删除</el-button> 
         <el-button type="success" plain size="medium" icon="el-icon-s-custom" @click="handleCustom(index,item)">OPTION</el-button>
        
        
            <div><el-tag type="success" size="mini">Name</el-tag><br>
            <!--<span v-html="showHighlight(item.name)"></span>-->
         <no-ssr>
               <mavon-editor
                v-model="item.name"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
    
            </div>
            

            <div><el-tag type="success" size="mini">Tfidf</el-tag><br>
            <span v-html="showHighlight(item.tfidf)"></span>
        <!--
         <no-ssr>
               <mavon-editor
                v-model="item.tfidf"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
        -->
    
            </div>
            

            <div><el-tag type="success" size="mini">Num</el-tag><br>
            <span v-html="showHighlight(item.num)"></span>
        <!--
         <no-ssr>
               <mavon-editor
                v-model="item.num"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
        -->
    
            </div>
            
        <el-button type="text" size="small" icon="el-icon-view" @click="show_drawer(item)">详情</el-button>
        <el-button type="text" size="small" icon="el-icon-document-copy" @click="show_dialog(item,1)">复制</el-button>
        <el-button type="text" size="small" icon="el-icon-edit" @click="show_dialog(item)">编辑</el-button>
        <el-button type="text" size="small" icon="el-icon-s-custom" @click="handleCustom(index,item)">OPTION</el-button>
        
         <el-button type="text" size="small" icon="el-icon-delete" @click="handleDelete(index,item)">直接删除</el-button> 
        

      </el-collapse-item>

    </el-collapse>
    <p   v-loading="listLoading"  style="text-align:center; line-height:50px;"><a href="javascript:;" class="blue01" @click="load()">点击加载更多({{ totalCount - list.length }})</a></p>
 
    </el-tab-pane>

  


</el-tabs>

    <el-dialog title="Form" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="form"  label-width="100px">
        
        
        
            <el-form-item label="Name">
               
       <!--
         <el-input v-model="form.name" autocomplete="off" type="" :autosize="{ minRows: 2, maxRows: 3}" />
       -->
       <div><mavon-editor  ref=md  v-model="form.name" @imgAdd="$imgAdd"  @save="saveDoc" /></div>
    
            </el-form-item>
            

            <el-form-item label="Tfidf">
               <el-input v-model="form.tfidf" autocomplete="off" type="" :autosize="{ minRows: 2, maxRows: 3}" @keyup.enter.native="do_submit" />
        <!--
        <div><mavon-editor  ref=md  v-model="form.tfidf" @imgAdd="$imgAdd"  @save="saveDoc" /></div>
        -->
    
            </el-form-item>
            

            <el-form-item label="Num">
               <el-input v-model="form.num" autocomplete="off" type="" :autosize="{ minRows: 2, maxRows: 3}" @keyup.enter.native="do_submit" />
        <!--
        <div><mavon-editor  ref=md  v-model="form.num" @imgAdd="$imgAdd"  @save="saveDoc" /></div>
        -->
    
            </el-form-item>
            

        <el-form-item label="Keep">
            <el-checkbox v-model="form.goon">On</el-checkbox>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-loading="loading" type="primary" @click="do_submit">确 定</el-button>
      </div>
    </el-dialog>

    <el-drawer
     title="我是标题"
     :visible.sync="drawer"
     :with-header="false">
     <div style="height:700px;overflow:auto;">
     <span>
      <el-collapse v-model="activeName2">
      <el-collapse-item v-for="item in list2" :title="'['+item.id +']'" name="1">
        
            <div><el-tag type="success" size="mini">Name</el-tag><br>
            <!--<span v-html="showHighlight(item.name)"></span>-->
         <no-ssr>
               <mavon-editor
                v-model="item.name"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
    
            </div>
            

            <div><el-tag type="success" size="mini">Tfidf</el-tag><br>
            <span v-html="showHighlight(item.tfidf)"></span>
        <!--
         <no-ssr>
               <mavon-editor
                v-model="item.tfidf"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
        -->
    
            </div>
            

            <div><el-tag type="success" size="mini">Num</el-tag><br>
            <span v-html="showHighlight(item.num)"></span>
        <!--
         <no-ssr>
               <mavon-editor
                v-model="item.num"
                :subfield="false"
                :boxShadow="false"
                defaultOpen="preview"
                :toolbarsFlag="false"
                />
            </no-ssr>
        -->
    
            </div>
            

        <div><el-tag type="success" size="mini">Created</el-tag><br><span v-html="showHighlight(item.created_at)"></span></div>         
        <div><el-tag type="success" size="mini">Updated</el-tag><br><span v-html="showHighlight(item.updated_at)"></span></div>         

        <el-button type="text" size="small" icon="el-icon-edit" @click="show_dialog(item)">编辑</el-button>
      </el-collapse-item>

    </el-collapse>
    </span>
    </div>
   </el-drawer>




  </div>
<el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
</template>

<script>
import axios from 'axios'
import Sortable from 'sortablejs'
import echarts from 'echarts'
import marked from 'marked'
import {mavonEditor} from "mavon-editor";
import "mavon-editor/dist/css/index.css";

import request from '@/utils/request'
import {rowDrop,goPath, handleCustom, download_id, download, show_dialog, do_submit, update_item, create_item, handleSizeChange, handleCurrentChange, handleDelete, fetchData, refresh, show_alert } from '@/utils/common_list'

export default {
  components: {mavonEditor},
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
      list2: null,
      drawer: false,
      listLoading: true,
      input: '',
      currentPage: 1,
      pageSize: 30,
      totalCount: 400,
      dialogFormVisible: false,
      form: {
        tag: '',
        goon: false,
      },
      id: '',
      loading: false,
      activeName: 'sixth',
      activeName2: ['1'],
      table_name: 'rss_summary',
      multipleSelection : [],
      multipleSelectionFlag : false,
      multiDeleteVisible: false,
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    $route: {
      handler: function(route) {
        this.input = route.query && route.query.key
      },
      immediate: true
    }
  },
  mounted(){
    //this.drawLine();
    var browser={
      versions:function(){
        var u = navigator.userAgent, 
        app = navigator.appVersion;
        return {
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
          iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
          weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
          qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
      }(),
      language:(navigator.browserLanguage || navigator.language).toLowerCase()
    }

    if(browser.versions.mobile||browser.versions.android||browser.versions.ios){
      this.activeName = "sixth"
    }
  },
  methods: {
    

    
    handleCustom,
    rowDrop,
    goPath,
    download,
    download_id,
    show_dialog,
    do_submit,
    update_item,
    show_alert,
    create_item,
    handleSizeChange,
    handleCurrentChange,
    handleDelete,
    fetchData,
    refresh,
    load() {
      this.currentPage = this.currentPage +  1
      console.log('more')

      this.fetchData(true)
    },
    showHighlight(val) {
     val = val + '';
     val =  val.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')
     if (val.indexOf(this.input) !== -1 && this.input !== '') {
       val =  val.replace(this.input, '<font color="#409EFF"><b>' + this.input + '</b></font>')
       return val
     } else {
       return val
     }
    },
    show_drawer(row){
       this.drawer = true
       this.list2 = new Array(row)
    },
    show_all(id){
       document.getElementById(id).style.cssText = 'overflow: hidden;height:auto;';
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.multipleSelectionFlag = true;
      if (this.multipleSelection.length == 0) {
       this.multipleSelectionFlag = false;
      }
    },
    multiDelete() {
       this.multiDeleteVisible = false
       var that = this
       console.log("multiDelete")
       console.log(this.multipleSelection)
       this.multipleSelection.forEach(function (item) {
         console.log(item)
         that.handleDelete(-1, item)
       });
       setTimeout(function () {
         that.fetchData()
       },500);
    },
    handleBeforeUpload(){
         this.listLoading = true
         return true
    },
    handleUploadSuccess(){
         this.fetchData()
    },
    saveDoc(markdown, html) {
         // 此时会自动将 markdown 和 html 传递到这个方法中
         console.log("markdown内容:" + markdown);
         console.log("html内容:" + html);
         //this.form.goon = true
         this.do_submit()
    },
    $imgAdd(pos, $file){
           var formdata = new FormData();
           formdata.append('file', $file);
           axios({
               url: '/rss_summary/upload',
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((url) => {
               console.log(url)
               /**
               * $vm 指为mavonEditor实例，可以通过如下两种方式获取
               * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
               * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
               */
               this.$refs.md.$img2Url(pos, "/static2/mypic/"+url.data);
          })
     },
     drawLine(){
        axios({
           url: '/rss_summary/upload',
           method: 'get',
           data: {},
        }).then((url) => {
           console.log(url)
           let myChart = echarts.init(document.getElementById('myChart_rss_summary'))
           myChart.setOption(url.data)
        })
     },
     handleClick(tab) {
       console.log(tab.paneName)
       if(tab.paneName == "fourth"){
          this.drawLine()
       }
     },

  }
}
</script>



<style>
pre{
/* display: inline; */
white-space: pre-wrap; /*?css-3 */
white-space: -moz-pre-wrap; /*?Mozilla, since 1999 */
white-space: -pre-wrap; /* Opera 4-6 */
white-space: -o-pre-wrap; /* Opera 7 */
word-wrap: break-word; /* Internet Explorer 5.5+ */
font-family: "Muli", sans-serif;
font-size: 14px;
color: #606266;

}


 .el-carousel__item--card, .el-carousel__item.is-animating{
    padding: 55px;
 }
 .el-carousel__item span {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #d3dce6;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #FBFCFC;
  }
.v-note-wrapper{
   min-height: auto !important;
   position:inherit !important;
}
.el-table .my-cell {
    vertical-align: top
}
.el-drawer__body {
    padding: 10px !important;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>
