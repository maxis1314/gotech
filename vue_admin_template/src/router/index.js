import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/todos',
    component: () => import('@/views/login/todos'),
    hidden: true
  },
  
  {
    path: '/todos2',
    component: () => import('@/views/login/todos2'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

    
  // 404 page must be placed at the end !!!
 // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export const asyncRouterMap = [


  {
    path: '/permission',
    component: Layout,
    name: 'permission',
    redirect: '/permission/index222',
    meta: {title:'Program', role: ['admin','editor'] , icon: 'example' }, //页面需要的权限
    children: [

{
    path: 'todo',
    name: 'Todo',
    component: () => import('@/views/table/todo'),
    meta: { title: 'Todo', icon: 'tree' , role: ['todo']}
},
{
    path: 'rss_summary',
    name: 'RssSummary',
    component: () => import('@/views/table/rss_summary'),
    meta: { title: 'RssSummary', icon: 'tree' , role: ['rss_summary']}
},

{
    path: 'info',
    name: 'Info',
    component: () => import('@/views/table/info'),
    meta: { title: 'Info', icon: 'tree' , role: ['info']}
},

{
    path: 'blog2',
    name: 'Blog2',
    component: () => import('@/views/table/blog2'),
    meta: { title: 'Blog2', icon: 'tree' , role: ['blog2']}
},

{
    path: 'blog3',
    name: 'Blog3',
    component: () => import('@/views/table/blog3'),
    meta: { title: 'Blog3', icon: 'tree' , role: ['blog3']}
},

{
    path: 'memo',
    name: 'Memo',
    component: () => import('@/views/table/memo'),
    meta: { title: 'Memo', icon: 'tree' , role: ['memo']}
},

{
    path: 'memo2',
    name: 'Life',
    component: () => import('@/views/table/memo2'),
    meta: { title: 'Life', icon: 'tree' , role: ['memo2']}
},

{
    path: 'memo3',
    name: 'Memo3',
    component: () => import('@/views/table/memo3'),
    meta: { title: 'Memo3', icon: 'tree' , role: ['memo3']}
},

{
    path: 'sample',
    name: 'Sample',
    component: () => import('@/views/table/sample'),
    meta: { title: 'Sample', icon: 'tree' , role: ['sample']}
},

{
    path: 'blog',
    name: 'Blog',
    component: () => import('@/views/table/blog'),
    meta: { title: 'Blog', icon: 'tree' , role: ['blog']}
},

{
    path: 'tag',
    name: 'Tech',
    component: () => import('@/views/table/tag'),
    meta: { title: 'Tech', icon: 'tree' , role: ['tag']}
},

{
    path: 'crawler',
    name: 'Crawler',
    component: () => import('@/views/table/crawler'),
    meta: { title: 'Crawler', icon: 'tree' , role: ['crawler']}
},

{
    path: 'iris',
    name: 'Iris',
    component: () => import('@/views/table/iris'),
    meta: { title: 'Iris', icon: 'tree' , role: ['iris']}
},

{
    path: 'intel',
    name: 'Intel',
    component: () => import('@/views/table/intel'),
    meta: { title: 'Intel', icon: 'tree' , role: ['intel']}
},

{
    path: 'log',
    name: 'Log',
    component: () => import('@/views/table/log'),
    meta: { title: 'Log', icon: 'tree' , role: ['log']}
},

{
    path: 'task',
    name: 'Task',
    component: () => import('@/views/table/task'),
    meta: { title: 'Task', icon: 'tree' , role: ['task']}
},

{
    path: 'successdiary',
    name: 'Success',
    component: () => import('@/views/table/successdiary'),
    meta: { title: 'Success', icon: 'tree' , role: ['successdiary']}
},

{
    path: 'lifetarget',
    name: 'Target',
    component: () => import('@/views/table/lifetarget'),
    meta: { title: 'Target', icon: 'tree' , role: ['lifetarget']}
},


{
    path: 'pics',
    name: 'Pics',
    component: () => import('@/views/table/pics'),
    meta: { title: 'Pics', icon: 'tree' , role: ['pics']}
},

{
    path: 'pics2',
    name: 'Pics2',
    component: () => import('@/views/table/pics2'),
    meta: { title: 'Pics2', icon: 'tree' , role: ['pics2']}
},

{
    path: 'user',
    name: 'User',
    component: () => import('@/views/table/user'),
    meta: { title: 'User', icon: 'tree' , role: ['user']}
},

{
    path: 'sql_buffer',
    name: 'SqlBuffer',
    component: () => import('@/views/table/sql_buffer'),
    meta: { title: 'SqlBuffer', icon: 'tree' , role: ['sql_buffer']}
},

{
    path: 'token',
    name: 'Token',
    component: () => import('@/views/table/token'),
    meta: { title: 'Token', icon: 'tree' , role: ['token']}
},

{
    path: 'spend',
    name: 'Spend',
    component: () => import('@/views/table/spend'),
    meta: { title: 'Spend', icon: 'tree' , role: ['spend']}
},

{
    path: 'habit',
    name: 'Habit',
    component: () => import('@/views/table/habit'),
    meta: { title: 'Habit', icon: 'tree' , role: ['habit']}
},



{
    path: 'rss',
    name: 'Rss',
    component: () => import('@/views/table/rss'),
    meta: { title: 'Rss', icon: 'tree' , role: ['rss']}
},

{
    path: 'script',
    name: 'Script',
    component: () => import('@/views/table/script'),
    meta: { title: 'Script', icon: 'tree' , role: ['script']}
},


{
    path: 'word_list',
    name: 'WordList',
    component: () => import('@/views/table/word_list'),
    meta: { title: 'WordList', icon: 'tree' , role: ['word_list']}
},

{
    path: 'noval',
    name: 'Noval',
    component: () => import('@/views/table/noval'),
    meta: { title: 'Noval', icon: 'tree' , role: ['noval']}
},
/*#####AUTO_GENERATED#####*/

    ],

  },
  { path: '*', redirect: '/404', hidden: true }
];





export default router
