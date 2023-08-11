import { collection } from 'firebase/firestore'
import { useFirestore, useCollection } from 'vuefire'

import { PROPERTIES } from '@/constants'

export const useProperties = () => {
  const db = useFirestore()
  const propertiesCollection = useCollection(collection(db, PROPERTIES))

  return { propertiesCollection }
}
