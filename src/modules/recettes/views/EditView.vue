<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import RecetteForm from '../components/RecetteForm.vue'
import { recetteRepository } from '../data/RecetteRepository'
import type { NouvelleRecette, Recette } from '../domain/types'

const props = defineProps<{ id?: string }>()
const router = useRouter()

const recette = ref<Recette>()
const introuvable = ref(false)

onMounted(async () => {
  if (!props.id) return
  const r = await recetteRepository.get(props.id)
  if (r) recette.value = r
  else introuvable.value = true
})

async function save(data: NouvelleRecette) {
  if (props.id) {
    await recetteRepository.update(props.id, data)
    router.push({ name: 'recette-detail', params: { id: props.id } })
  } else {
    const creee = await recetteRepository.create(data)
    router.push({ name: 'recette-detail', params: { id: creee.id } })
  }
  router.push({ name: 'recettes-liste' })
}

function annuler() {
  if (props.id) router.push({ name: 'recette-detail', params: { id: props.id } })
  else router.push({ name: 'recettes-liste' })
}
</script>

<template>
  <v-container>
    <v-alert v-if="introuvable" type="warning" text="Recette introuvable" />

    <!-- v-if : le formulaire copie `initial` une seule fois, il doit donc attendre le chargement -->
    <RecetteForm v-else-if="!id || recette" :initial="recette" @save="save" @cancel="annuler" />
  </v-container>
</template>
