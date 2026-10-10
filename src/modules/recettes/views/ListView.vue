<script setup lang="ts">
import { useRecettes } from '../composables/useRecettes'
import RecetteCard from '../components/RecetteCard.vue'

const { recettes } = useRecettes()
</script>

<!-- <RouterLink :to="{ name: 'recette-detail', params: { id: r.id } }"> pour naviguer à différents endroits -->
<template>
  <v-container>
    <p v-if="recettes.length === 0" class="text-medium-emphasis">Aucune recette pour l'instant.</p>

    <v-row>
      <v-col v-for="r in recettes" :key="r.id" cols="12" sm="6">
        <RecetteCard :recette="r" class="h-100" />
      </v-col>
    </v-row>
  </v-container>
</template>
