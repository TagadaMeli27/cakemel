<script setup lang="ts">
import { useRecettes } from '../composables/useRecettes'
import { recetteRepository } from '../data/RecetteRepository'
import RecetteCard from '../components/RecetteCard.vue'

const { recettes } = useRecettes()

// TEMPORAIRE : pour avoir des données à afficher, à supprimer ensuite
function ajouterTest() {
  recetteRepository.create({ titre: 'Recette test', tags: ['test'] })
}
</script>

<!-- <RouterLink :to="{ name: 'recette-detail', params: { id: r.id } }"> pour naviguer à différents endroits -->
<template>
  <v-container>
    <h1 class="text-h5 mb-4">Mes recettes</h1>

    <p v-if="recettes.length === 0" class="text-medium-emphasis">Aucune recette pour l'instant.</p>

    <RecetteCard v-for="r in recettes" :key="r.id" :recette="r" />

    <v-btn color="primary" prepend-icon="mdi-plus" @click="ajouterTest">
      Ajouter une recette de test
    </v-btn>
  </v-container>
</template>
