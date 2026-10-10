import Dexie, { type EntityTable } from 'dexie'
import type { Recette } from '@/modules/recettes/domain/types'

export class CakemelDatabase extends Dexie {
  recettes!: EntityTable<Recette, 'id'>

  constructor(name = 'cakemel') {
    super(name)
    this.version(1).stores({
      recettes: 'id, titre, updatedAt, *tags',
    })
  }
}

export const db = new CakemelDatabase()
