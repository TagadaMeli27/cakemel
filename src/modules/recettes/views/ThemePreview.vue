<template>
  <v-container>
    <h1 class="text-h5 mb-4">Aperçu du thème</h1>

    <div class="d-flex flex-wrap ga-2 mb-4">
      <v-btn color="primary">Primary</v-btn>
      <v-btn color="secondary">Secondary</v-btn>
      <v-btn color="primary" variant="tonal">Tonal</v-btn>
      <v-btn color="primary" variant="outlined">Outlined</v-btn>
      <v-btn color="error" variant="flat">Erreur</v-btn>
      <v-btn color="success" variant="flat">Succès</v-btn>
      <v-btn color="warning" variant="flat">Warning</v-btn>
      <v-btn color="info" variant="flat">Info</v-btn>
    </div>

    <h2 class="text-h6 mb-2">Les 5 couleurs de tags</h2>
    <div class="mb-4">
      <v-chip v-for="n in 5" :key="n" :color="`tag${n}`" :variant="'tonal'" class="mr-1 mb-1">
        tag{{ n }}
      </v-chip>
    </div>

    <v-card class="mb-4">
      <v-card-title>Cake au citron</v-card-title>
      <v-card-text>
        Un gâteau moelleux, parfumé au zeste.
        <div class="mt-2">
          <v-chip color="secondary" variant="tonal" class="mr-1">dessert</v-chip>
          <v-chip color="primary" variant="tonal">rapide</v-chip>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn icon="mdi-heart" variant="text" color="favori" />
      </v-card-actions>
    </v-card>

    <v-text-field label="Un champ de formulaire" />
    <v-alert type="success" class="mb-2" text="Recette enregistrée" />
    <v-alert type="error" text="Le titre est obligatoire" />
  </v-container>
</template>
