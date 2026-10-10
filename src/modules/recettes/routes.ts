import type { RouteRecordRaw } from 'vue-router'

export const recettesRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'recettes-liste',
    component: () => import('./views/ListView.vue'),
  },
  {
    path: '/theme',
    name: 'theme-preview',
    component: () => import('./views/ThemePreview.vue'),
  },
  {
      path: '/recettes/creer',
      name: 'recette-creation',
      component: () => import('./views/EditView.vue')
  },
  // {
  //     path: '/recettes/:id',
  //     name: 'recette-detail',
  //     component: () => import('./views/DetailView.vue'),
  //     props: true
  // },
  // {
  //     path: '/recettes/:id/modifier',
  //     name: 'recette-edition',
  //     component: () => import('./views/EditView.vue'),
  //     props: true
  // },
]
