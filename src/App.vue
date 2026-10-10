<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import type { RouteLocationRaw } from 'vue-router'
import { useDisplay } from 'vuetify'

const APP_NAME = 'Cakemel'

// true sur téléphone (et petite tablette), false sur grand écran
const { mobile } = useDisplay()

const route = useRoute()
const router = useRouter()

const titre = computed(() => (route.meta.titre as string | undefined) ?? APP_NAME)
const avecRetour = computed(() => route.meta.retour === true)

// Retour à la page précédente, ou à la liste si on est arrivé directement sur cette adresse
function retour() {
  if (window.history.state?.back) router.back()
  else router.push({ name: 'recettes-liste' })
}

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
    <v-app-bar>
      <v-btn v-if="avecRetour" icon="mdi-arrow-left" aria-label="Retour" @click="retour" />
      <v-app-bar-title>{{ titre }}</v-app-bar-title>
    </v-app-bar>

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
    <v-bottom-navigation v-if="mobile" grow bg-color="primary" elevation="0">
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