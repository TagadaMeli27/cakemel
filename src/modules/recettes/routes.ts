import type { RouteRecordRaw } from 'vue-router'

export const recettesRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'recettes-liste',
    component: () => import('./views/ListView.vue'),
    meta: { titre: 'Mes recettes' },
  },
  {
    path: '/favoris',
    name: 'recettes-favoris',
    component: () => import('./views/FavorisListView.vue'),
    meta: { titre: 'Mes favoris' },
  },
  {
    path: '/theme',
    name: 'theme-preview',
    component: () => import('./views/ThemePreview.vue'),
  },
  {
    path: '/recettes/creer',
    name: 'recette-creation',
    component: () => import('./views/EditView.vue'),
    meta: { titre: 'Nouvelle recette', retour: true },
  },
  {
    path: '/recettes/:id',
    name: 'recette-detail',
    component: () => import('./views/DetailView.vue'),
    props: true,
    meta: { titre: 'Recette', retour: true },
  },
  {
    path: '/recettes/:id/modifier',
    name: 'recette-edition',
    component: () => import('./views/EditView.vue'),
    props: true,
    meta: { titre: 'Modifier la recette', retour: true },
  },
]
