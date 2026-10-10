<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'
import { useDisplay } from 'vuetify'

const APP_NAME = 'Cakemel'

// true sur téléphone (et petite tablette), false sur grand écran
const { mobile } = useDisplay()

type Entree = {
  titre: string
  icone: string
  to?: RouteLocationRaw // absent = pas de lien
  exact?: boolean
  disabled?: boolean
}

const items: Entree[] = [
  {
    titre: 'Recettes',
    icone: 'mdi-book-open-variant',
    to: { name: 'recettes-liste' },
    exact: true,
  },
  { titre: 'Ajouter', icone: 'mdi-plus-circle-outline', to: { name: 'recette-creation' } },
  // TEMPORAIRE : accès à la page de test des couleurs
  { titre: 'Thème', icone: 'mdi-palette-outline', to: '/theme' },
]
</script>

<template>
  <v-app>
    <v-app-bar :title="APP_NAME" />

    <!-- Grand écran : menu latéral réduit, qui se déploie au survol -->
    <v-navigation-drawer v-if="!mobile" permanent rail expand-on-hover>
      <v-list nav>
        <v-list-item
          v-for="item in items"
          :key="item.titre"
          :to="item.to"
          :exact="item.exact"
          :disabled="item.disabled"
          :prepend-icon="item.icone"
          :title="item.titre"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <RouterView />
    </v-main>

    <!-- Téléphone : barre du bas, à portée de pouce -->
    <v-bottom-navigation v-if="mobile" grow color="primary">
      <v-btn
        v-for="item in items"
        :key="item.titre"
        :to="item.to"
        :exact="item.exact"
        :disabled="item.disabled"
      >
        <v-icon>{{ item.icone }}</v-icon>
        {{ item.titre }}
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
