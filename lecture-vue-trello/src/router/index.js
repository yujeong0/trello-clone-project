import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'
import NotFound from '../components/NotFound.vue'
import store from '../store'

Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
  // isAuth는 vue 인스턴스가 없어서 this.$store. 로 접근 못 함
  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}` // 쿼리문자열로 오기 때문에 인코딩 필요
  store.getters.isAuth? next() : next(loginPath)  // Auth 있으면 next()그대로 진행, 없으면 로그인패이지...!
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home, beforeEnter: requireAuth},
    { path: '/login', component: Login },
    {   // :bid -> bid라는 변수로 받는다.
        path: '/b/:bid', 
        component: Board, 
        beforeEnter: requireAuth, 
        children: [{ path: 'c/:cid', component: Card, beforeEnter: requireAuth }]
    },  
    { path: '*', component: NotFound }
  ]
})

export default router