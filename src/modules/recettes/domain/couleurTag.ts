const COULEURS_TAG = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5']

// Le même nom de tag donne toujours la même couleur
export function couleurTag(tag: string): string {
  let hash = 0
  for (const c of tag) hash = (hash * 31 + c.charCodeAt(0)) >>> 0
  return COULEURS_TAG[hash % COULEURS_TAG.length]!
}
