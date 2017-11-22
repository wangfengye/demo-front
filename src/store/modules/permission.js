import {simpleRouterMap, asyncRouterMap} from '../../router'

/**
 * 通过meta.role 判断权限
 * @param role
 * @param route
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.role) {
    return route.meta.role.some(item => roles.indexOf(item) >= 0)
  } else {
    return true
  }
}
/**
 * 递归路由,返回符合权限的路由表
 * @param {*路由} router
 * @param {*角色权限} roles
 */
function filterRouter (router, roles) {
  let accessedRouters = router.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length > 0) {
        route.children = filterRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    mainRouters: simpleRouterMap,
    addRouters: [],
    isFinished: false
  },
  mutations: {
    SET_ROUTERS (state, routers) {
      // 变更状态
      state.addRouters = routers
      state.mainRouters = simpleRouterMap.concat(routers)
      state.isFinished = true
    }
  },
  actions: {
    GenerateRoutes ({commit}, roles) {
      return new Promise(resolve => {
        let accessedRouters
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}
export default permission
