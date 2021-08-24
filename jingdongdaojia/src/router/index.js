import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
}, {
  path: '/cartList',
  name: 'CartList',
  component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartList')
}, {
  path: '/orderConfirmation/:id',
  name: 'OrderConfirmation',
  component: () => import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation')
}, {
  path: '/orderList',
  name: 'OrderList',
  component: () => import(/* webpackChunkName: "orderList" */ '../views/orderList/OrderList')
}, {
  path: '/shop/:id',
  name: 'Shop',
  component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
}, {
  path: '/register',
  name: 'Register',
  component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),
  beforeEnter(to, from, next) {
    const {isLogin} = localStorage
    isLogin ? next({name: 'Home'}) : next()
  }
}, {
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
  beforeEnter: (to, from, next) => {
    // const isLogin = localStorage.isLogin
    // // 判断是否是已登录状态，是的话就跳转到首页，不是就继续跳转登录页面
    // if (isLogin) {
    //   next({ name: 'Home' })
    // } else {
    //   next()
    // }
    const {isLogin} = localStorage
    isLogin ? next({name: 'Home'}) : next()
  }
}
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  const {isLogin} = localStorage
  const {name} = to
  const isLoginOrRegister = (name === 'Login' || name === 'Register');
  (isLogin || isLoginOrRegister) ? next() : next({name: 'Login'})
})

export default router
