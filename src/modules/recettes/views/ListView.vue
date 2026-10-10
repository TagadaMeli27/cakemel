<script setup lang="ts">
import { useRecettes } from '../composables/useRecettes'
import RecetteCard from '../components/RecetteCard.vue'

const { recettes } = useRecettes()
</script>

<!-- <RouterLink :to="{ name: 'recette-detail', params: { id: r.id } }"> pour naviguer à différents endroits -->
<template>
  <v-container>
    <h1 class="text-h5 mb-4">Mes recettes</h1>

    <p v-if="recettes.length === 0" class="text-medium-emphasis">Aucune recette pour l'instant.</p>

    <RecetteCard v-for="r in recettes" :key="r.id" :recette="r" />
  </v-container>
</template>
