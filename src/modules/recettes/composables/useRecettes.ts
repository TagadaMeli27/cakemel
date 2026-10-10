import { useLiveQuery } from '@/core/composables/useLiveQuery'
import { recetteRepository } from '../data/RecetteRepository'

export function useRecettes() {
  const recettes = useLiveQuery(() => recetteRepository.list(), [])
  return { recettes }
}
