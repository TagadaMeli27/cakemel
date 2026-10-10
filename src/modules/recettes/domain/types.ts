export interface Ingredient {
  nom: string
  quantite: number | null
  unite: string
}

export interface Recette {
  id: string
  titre: string
  description: string
  portions: number | null
  tempsPrep: number | null
  tempsCuisson: number | null
  source: string
  notes: string
  favori: boolean
  tags: string[]
  ingredients: Ingredient[]
  etapes: string[]
  createdAt: string
  updatedAt: string
}

export type NouvelleRecette = Omit<Recette, 'id' | 'createdAt' | 'updatedAt'>
