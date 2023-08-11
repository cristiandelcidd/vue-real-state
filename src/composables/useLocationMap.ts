import { ref } from 'vue'
import type { LeafletEvent, PointTuple } from 'leaflet'

export const useLocationMap = () => {
  const zoom = ref<number>(15)
  const center = ref<PointTuple>([15.470202, -88.006898])

  const pin = (e: LeafletEvent) => {
    const marker = e.target.getLatLng()

    center.value = [marker.lat, marker.lng]
  }

  return { zoom, center, pin }
}
