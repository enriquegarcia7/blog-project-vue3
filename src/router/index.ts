import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NoteListView from '@/views/NoteListView.vue'
import NoteCreateView from '@/views/NoteCreateView.vue'
import useAuthStore from '@/stores/auth'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/notes',
      name: 'notes',
      component: NoteListView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/create',
      name: 'create',
      component: NoteCreateView,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const isAuth = auth.token
  if(to.meta.requiresAuth && !isAuth) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
