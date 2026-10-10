<script setup lang="ts">
import type { Recette } from '../domain/types'

defineProps<{
  recette: Pick<Recette, 'id' | 'titre' | 'tags'>
}>()
</script>

<template>
  <v-card class="mb-3">
    <v-card-title>{{ recette.titre }}</v-card-title>
    <v-card-text>
      <v-chip
        v-for="t in recette.tags"
        :key="t"
        class="mr-1"
        color="secondary"
        variant="tonal"
      >
        {{ t }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>