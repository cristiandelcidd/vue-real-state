import { createRouter, createWebHistory } from 'vue-router'

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

export default router
