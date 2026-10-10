<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLiveQuery } from '@/core/composables/useLiveQuery'
import { recetteRepository } from '../data/RecetteRepository'
import { couleurTag } from '../domain/couleurTag'
import type { Ingredient, Recette } from '../domain/types'

const props = defineProps<{ id: string }>()
const router = useRouter()

// undefined = chargement en cours, null = recette introuvable
const recette = useLiveQuery<Recette | null | undefined>(
  () => recetteRepository.get(props.id).then((r) => r ?? null),
  undefined,
)

const dialogSuppression = ref(false)

// "200 g farine", ou "2 œufs" quand il n'y a pas d'unité
function ligne(i: Ingredient): string {
  const quantite = i.quantite !== null ? String(i.quantite).replace('.', ',') : ''
  return [quantite, i.unite, i.nom].filter(Boolean).join(' ')
}

async function basculerFavori() {
  if (!recette.value) return
  await recetteRepository.update(recette.value.id, { favori: !recette.value.favori })
}

async function supprimer() {
  await recetteRepository.delete(props.id)
  router.replace({ name: 'recettes-liste' })
}
</script>

<template>
  <v-container>
    <v-progress-linear v-if="recette === undefined" indeterminate color="secondary" />

    <v-alert v-else-if="recette === null" type="warning" text="Recette introuvable" />

    <template v-else>
      <div class="d-flex align-start ga-2">
        <h1 class="text-h5 flex-grow-1 text-secondary">{{ recette.titre }}</h1>
        <v-btn
          :icon="recette.favori ? 'mdi-heart' : 'mdi-heart-outline'"
          :color="recette.favori ? 'favori' : undefined"
          variant="text"
          aria-label="Basculer favori"
          @click="basculerFavori"
        />
      </div>

      <div class="d-flex flex-wrap ga-2 mt-2">
        <v-chip v-if="recette.portions" prepend-icon="mdi-silverware-fork-knife" variant="tonal" color="secondary">
          {{ recette.portions }} portions
        </v-chip>
        <v-chip v-if="recette.tempsPrep" prepend-icon="mdi-timer-outline" variant="tonal" color="secondary">
          Prépa {{ recette.tempsPrep }} min
        </v-chip>
        <v-chip v-if="recette.tempsCuisson" prepend-icon="mdi-pot-steam-outline" variant="tonal" color="secondary">
          Cuisson {{ recette.tempsCuisson }} min
        </v-chip>
      </div>

      <div v-if="recette.tags.length" class="d-flex flex-wrap ga-1 mt-3">
        <v-chip v-for="t in recette.tags" :key="t" :color="couleurTag(t)" variant="flat">
          {{ t }}
        </v-chip>
      </div>

      <p v-if="recette.description" class="mt-4 text-pre-line">{{ recette.description }}</p>

      <h2 class="text-h6 mt-6 mb-2 text-secondary">Ingrédients</h2>
      <v-card v-if="recette.ingredients.length">
        <v-list>
          <v-list-item v-for="(ing, i) in recette.ingredients" :key="i" :title="ligne(ing)" />
        </v-list>
      </v-card>
      <p v-else class="text-medium-emphasis">Aucun ingrédient renseigné.</p>

      <h2 class="text-h6 mt-6 mb-2 text-secondary">Préparation</h2>
      <div v-for="(etape, i) in recette.etapes" :key="i" class="d-flex ga-3 mb-3">
        <v-avatar color="primary" size="28" class="flex-shrink-0">
          <span class="text-body-2">{{ i + 1 }}</span>
        </v-avatar>
        <p class="text-pre-line my-0">{{ etape }}</p>
      </div>
      <p v-if="!recette.etapes.length" class="text-medium-emphasis">Aucune étape renseignée.</p>

      <v-card v-if="recette.notes" variant="tonal" class="mt-6">
        <v-card-title class="text-subtitle-1">Notes</v-card-title>
        <v-card-text class="text-pre-line">{{ recette.notes }}</v-card-text>
      </v-card>

      <p v-if="recette.source" class="mt-4 text-medium-emphasis">Source : {{ recette.source }}</p>

      <div class="d-flex ga-2 mt-8">
        <v-btn
          :to="{ name: 'recette-edition', params: { id } }"
          prepend-icon="mdi-pencil-outline"
          variant="tonal"
        >
          Modifier
        </v-btn>
        <v-spacer />
        <v-btn
          color="error"
          prepend-icon="mdi-delete-outline"
          @click="dialogSuppression = true"
        >
          Supprimer
        </v-btn>
      </div>

      <v-dialog v-model="dialogSuppression" max-width="400">
        <v-card
          title="Supprimer cette recette ?"
          :text="`« ${recette.titre} » sera définitivement supprimée de cet appareil.`"
        >
          <v-card-actions>
            <v-spacer />
            <v-btn @click="dialogSuppression = false">Annuler</v-btn>
            <v-btn color="error" @click="supprimer">Supprimer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-container>
</template>

<style>
h1 {
  display: inline-block;
  background-image: linear-gradient(180deg, transparent 60%, rgba(var(--v-theme-primary), 0.5) 60%);
}
</style>
