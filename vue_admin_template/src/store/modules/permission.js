import { asyncRouterMap, constantRoutes } from '@/router';

function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        return roles.some(role => route.meta.role.indexOf(role) >= 0)
    } else {
        return true
    }
}
  
const permission = {
    namespaced: true,
    state: {
        routers: constantRoutes,
        addRouters: []
    },
    mutations: {
      SET_ROUTERS: (state, routers) => {
        state.addRouters = routers;
        state.routers = constantRoutes.concat(routers);
      }
    },
    actions: {
        GenerateRoutes({ commit }, data) {//roles是用户所带的权限
            console.log(21)
            console.log(data)
            return new Promise(resolve => {
                const { roles } = data;
                console.log(asyncRouterMap)
                const accessedRouters = asyncRouterMap.filter(v => {
                    // if (roles.indexOf('admin') >= 0) {
                    //     return true;
                    // };
                    if (hasPermission(roles, v)) {
                        if (v.children && v.children.length > 0) {
                            console.log(v.children)
                            v.children = v.children.filter(child => {
                                if (hasPermission(roles, child)) {
                                    return child
                                }
                                return false;
                            });
                            return v
                        } else {
                            return v
                        }
                    }
                    return false;
                });
                console.log(22)
                console.log(accessedRouters)
                commit('SET_ROUTERS', accessedRouters);
                resolve();
            })
        }
    }
};
  
export default permission;
