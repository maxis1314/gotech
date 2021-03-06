const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  name: state => state.user.name,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers
  
}
export default getters
