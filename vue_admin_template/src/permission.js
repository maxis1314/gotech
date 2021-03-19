import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/todos','/todos2'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          console.log("-----in beforeEach-----")
          console.log(store.getters.roles)
          //await store.dispatch('user/getInfo')
          const { roles } = await store.dispatch('user/getInfo')
          console.log("-----after beforeEach-----")
          console.log(store.getters.roles)
          console.log(11)
          /*const accessRoutes = await store.dispatch('permission/GenerateRoutes', {roles})
          router.options.routes=store.getters.routers;
          console.log(accessRoutesa)
          router.addRoutes(accessRoutesa)
          console.log(12)
          next({ ...to, replace: true })*/

          store.dispatch('permission/GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
            
            console.log(12)
            console.log(store.getters.addRouters)
            if (store.getters.addRouters){
                console.log(13)
                router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                router.options.routes=store.getters.routers;
                next({ ...to, replace: true });// hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            }else{
                next()
            }
          })
          

          //next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
