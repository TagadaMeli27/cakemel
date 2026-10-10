import { db, type CakemelDatabase } from '@/core/db/database'
import type { NouvelleRecette, Recette } from '../domain/types'

export class RecetteRepository {
  private readonly database: CakemelDatabase

  // La base est injectable : on peut passer une base de test
  constructor(database: CakemelDatabase = db) {
    this.database = database
  }

  async create(data: Partial<NouvelleRecette>): Promise<Recette> {
    const now = new Date().toISOString()
    const recette: Recette = {
      id: crypto.randomUUID(),
      titre: '',
      description: '',
      portions: null,
      tempsPrep: null,
      tempsCuisson: null,
      source: '',
      notes: '',
      favori: false,
      tags: [],
      ingredients: [],
      etapes: [],
      ...data,
      createdAt: now,
      updatedAt: now,
    }
    await this.database.recettes.add(recette)
    return recette
  }

  get(id: string): Promise<Recette | undefined> {
    return this.database.recettes.get(id)
  }

  update(id: string, changes: Partial<NouvelleRecette>): Promise<number> {
    return this.database.recettes.update(id, {
      ...changes,
      updatedAt: new Date().toISOString(),
    })
  }

  delete(id: string): Promise<void> {
    return this.database.recettes.delete(id)
  }

  list(): Promise<Recette[]> {
    return this.database.recettes.orderBy('titre').toArray()
  }

  findFavoris(): Promise<Recette[]> {
    return this.database.recettes.filter((recette) => recette.favori).toArray()
  }

  findByTag(tag: string): Promise<Recette[]> {
    return this.database.recettes.where('tags').equals(tag).toArray()
  }

  async search(texte: string): Promise<Recette[]> {
    const q = texte.trim().toLowerCase()
    const toutes = await this.list()
    if (!q) return toutes
    return toutes.filter(
      (r) =>
        r.titre.toLowerCase().includes(q) ||
        r.ingredients.some((i) => i.nom.toLowerCase().includes(q)) ||
        r.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }

  async bulkUpsert(recettes: Recette[]): Promise<void> {
    await this.database.recettes.bulkPut(recettes)
  }
}

export const recetteRepository = new RecetteRepository()
