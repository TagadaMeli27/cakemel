import { ref, onUnmounted, type Ref } from 'vue'
import { liveQuery } from 'dexie'

export function useLiveQuery<T>(querier: () => T | Promise<T>, initial: T): Ref<T> {
  const data = ref(initial) as Ref<T>
  const sub = liveQuery(querier).subscribe({
    next: (v) => (data.value = v),
    error: (e) => console.error(e),
  })
  onUnmounted(() => sub.unsubscribe())
  return data
}
