import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      meta: { requiresAuth: true },
      component: () => import('@/views/admin/AdminLayout.vue'),
      children: [
        {
          path: '/admin/properties',
          name: 'admin-properties',
          component: () => import('@/views/admin/AdminView.vue')
        },
        {
          path: '/admin/create',
          name: 'create-property',
          component: () => import('@/views/admin/CreatePropertyView.vue')
        },
        {
          path: '/admin/edit/:id',
          name: 'edit-property',
          component: () => import('@/views/admin/EditPropertyView.vue')
        }
      ]
    }
  ]
})

const authenticateUser = () => {
  const auth = useFirebaseAuth()

  if (!auth) throw new Error('Auth was not provided!')

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()

      if (user) resolve(user)
      else reject()
    })
  })
}

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((url) => url.meta.requiresAuth)

  if (requiresAuth) {
    try {
      await authenticateUser()

      next()
    } catch (error) {
      console.log(error)
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
