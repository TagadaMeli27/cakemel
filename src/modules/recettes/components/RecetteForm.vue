<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { VForm } from 'vuetify/components'
import type { NouvelleRecette, Recette } from '../domain/types'

const props = defineProps<{ initial?: Recette }>()

const emit = defineEmits<{
  save: [data: NouvelleRecette]
  cancel: []
}>()

// On copie les données dans un objet à nous : on ne modifie jamais directement les props
function toFormState(r?: Recette): NouvelleRecette {
  return {
    titre: r?.titre ?? '',
    description: r?.description ?? '',
    portions: r?.portions ?? null,
    tempsPrep: r?.tempsPrep ?? null,
    tempsCuisson: r?.tempsCuisson ?? null,
    source: r?.source ?? '',
    notes: r?.notes ?? '',
    favori: r?.favori ?? false,
    tags: [...(r?.tags ?? [])],
    ingredients: (r?.ingredients ?? []).map((i) => ({ ...i })),
    etapes: [...(r?.etapes ?? [])],
  }
}

const form = reactive<NouvelleRecette>(toFormState(props.initial))

// Nouvelle recette : on démarre avec une ligne vide de chaque
if (!props.initial) {
  form.ingredients.push({ nom: '', quantite: null, unite: '' })
  form.etapes.push('')
}

const formRef = ref<InstanceType<typeof VForm> | null>(null)
const requis = (v: string) => !!v?.trim() || 'Champ requis'

function addIngredient() {
  form.ingredients.push({ nom: '', quantite: null, unite: '' })
}
function removeIngredient(index: number) {
  form.ingredients.splice(index, 1)
}
function addEtape() {
  form.etapes.push('')
}
function removeEtape(index: number) {
  form.etapes.splice(index, 1)
}

// Un champ numérique vide renvoie '' : on le convertit en null
function toNumberOrNull(v: unknown): number | null {
  if (v === '' || v === null || v === undefined) return null
  const n = Number(v)
  return Number.isFinite(n) ? n : null
}

async function onSubmit() {
  const result = await formRef.value?.validate()
  if (!result?.valid) return

  emit('save', {
    ...form,
    titre: form.titre.trim(),
    portions: toNumberOrNull(form.portions),
    tempsPrep: toNumberOrNull(form.tempsPrep),
    tempsCuisson: toNumberOrNull(form.tempsCuisson),
    tags: form.tags.map((t) => t.trim()).filter(Boolean),
    // Les lignes vides sont ignorées plutôt que bloquantes
    ingredients: form.ingredients
      .filter((i) => i.nom.trim() !== '')
      .map((i) => ({
        nom: i.nom.trim(),
        quantite: toNumberOrNull(i.quantite),
        unite: i.unite.trim(),
      })),
    etapes: form.etapes.map((e) => e.trim()).filter(Boolean),
  })
}
</script>

<template>
  <v-form ref="formRef" @submit.prevent="onSubmit">
    <v-text-field v-model="form.titre" label="Titre" :rules="[requis]" />
    <v-textarea v-model="form.description" label="Description" rows="2" auto-grow />

    <v-row dense>
      <v-col cols="4">
        <v-text-field v-model.number="form.portions" label="Portions" type="number" min="1" />
      </v-col>
      <v-col cols="4">
        <v-text-field v-model.number="form.tempsPrep" label="Prépa (min)" type="number" min="0" />
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model.number="form.tempsCuisson"
          label="Cuisson (min)"
          type="number"
          min="0"
        />
      </v-col>
    </v-row>

    <v-combobox v-model="form.tags" label="Tags" multiple chips closable-chips />

    <h2 class="text-h6 mt-4 mb-2">Ingrédients</h2>
    <v-row v-for="(ing, i) in form.ingredients" :key="i" dense>
      <v-col cols="4" sm="2">
        <v-text-field
          v-model.number="ing.quantite"
          label="Qté"
          type="number"
          min="0"
          inputmode="decimal"
        />
      </v-col>
      <v-col cols="8" sm="3">
        <v-text-field v-model="ing.unite" label="Unité" />
      </v-col>
      <v-col cols="12" sm="7">
        <v-text-field v-model="ing.nom" label="Ingrédient">
          <template #append>
            <v-btn icon="mdi-delete-outline" variant="text" @click="removeIngredient(i)" />
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-btn prepend-icon="mdi-plus" variant="tonal" @click="addIngredient">
      Ajouter un ingrédient
    </v-btn>

    <h2 class="text-h6 mt-6 mb-2">Étapes</h2>
    <v-textarea
      v-for="(etape, i) in form.etapes"
      :key="i"
      :model-value="etape"
      :label="`Étape ${i + 1}`"
      rows="2"
      auto-grow
      @update:model-value="form.etapes[i] = $event"
    >
      <template #append>
        <v-btn icon="mdi-delete-outline" variant="text" @click="removeEtape(i)" />
      </template>
    </v-textarea>
    <v-btn prepend-icon="mdi-plus" variant="tonal" @click="addEtape">Ajouter une étape</v-btn>

    <h2 class="text-h6 mt-6 mb-2">Plus</h2>
    <v-text-field v-model="form.source" label="Source (livre, site, personne...)" />
    <v-textarea v-model="form.notes" label="Notes" rows="2" auto-grow />

    <div class="d-flex ga-2 mt-4">
      <v-btn variant="text" @click="emit('cancel')">Annuler</v-btn>
      <v-spacer />
      <v-btn type="submit" color="primary">Enregistrer</v-btn>
    </div>
  </v-form>
</template>
