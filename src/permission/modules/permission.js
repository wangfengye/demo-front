import {simpleRouterMap, asyncRouterMap} from '../../router'

/**
 * 通过meta.role 判断权限
 * @param role
 * @param route
 */
function hasPermission (role, route) {
  if (route.meta && route.meta.role) {
    // 判断 route.meta.role中是否包含role
    return route.meta.role.indexof(role)
  } else {
    return true
  }
}
/**
 * 递归路由,返回符合权限的路由表
 * @param {*路由} router
 * @param {*角色权限} role
 */
function filterRouter (router, role) {
  let accessedRouters = router.filter(route => {
    if (hasPermission(role, route)) {
      if (route.children && route.children.length > 0) {
        route.children = filterRouter(route.children, role)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    mianRouters: simpleRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS (state, routers) {
      // 变更状态
      state.addRouters = routers
      state.mianRouters = simpleRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({commit}) {
      return new Promise(resolve => {
        const role = 'admin'
        let accessedRouters
        if (role === 'admin') {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterRouter(asyncRouterMap)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}
export default permission
