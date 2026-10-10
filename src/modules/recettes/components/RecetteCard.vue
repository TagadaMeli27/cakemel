<script setup lang="ts">
import type { Recette } from '../domain/types'
import { couleurTag } from '../domain/couleurTag'

defineProps<{ recette: Recette }>()
</script>

<template>
  <v-card :to="{ name: 'recette-detail', params: { id: recette.id } }">
    <v-card-title class="d-flex align-center">
      <span class="flex-grow-1 text-wrap">{{ recette.titre }}</span>
      <v-icon v-if="recette.favori" icon="mdi-heart" color="favori" size="small" />
    </v-card-title>
    <v-card-text v-if="recette.tags.length">
      <v-chip v-for="t in recette.tags" :key="t" :color="couleurTag(t)" variant="flat" class="mr-1">
        {{ t }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>
