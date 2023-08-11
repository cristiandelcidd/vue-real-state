import { computed } from 'vue'
import { collection } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

import { PROPERTIES } from '@/constants'

export const useProperties = () => {
  const db = useFirestore()
  const propertiesCollection = useCollection(collection(db, PROPERTIES))

  const propertyPrice = computed(() => {
    return (price: string) =>
      Number(price).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })
  })

  return { propertiesCollection, propertyPrice }
}
