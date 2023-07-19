import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index.vue'
import Sheets from '@/components/Body/Sheets/index.vue'
import Login from '@/components/Login/index.vue'
import Playlist from '@/components/Body/Playlist/index.vue'

const NotFound = { template: '<div>Page Not Found</div>' }

const Temp = { template: '<div>Page Not Found</div>' }

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'SheetsIndex',
      component: Index,
      children: [
        {
          path: 'index',
          component: Sheets,
        },
        {
          path: 'playlist/:id',
          component: Playlist
        },

      ]
    },
    {
      path: '/404',
      component: NotFound,
    }
  ]
})
