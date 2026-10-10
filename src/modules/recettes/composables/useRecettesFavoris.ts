import { useLiveQuery } from '@/core/composables/useLiveQuery'
import { recetteRepository } from '../data/RecetteRepository'

export function useRecettesFavoris() {
  const recettes = useLiveQuery(() => recetteRepository.findFavoris(), [])
  return { recettes }
}
