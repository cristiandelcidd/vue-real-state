import { computed, ref } from 'vue'
import { collection, doc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'

import Swal from 'sweetalert2'

import { PROPERTIES } from '@/constants'

export const useProperties = () => {
  const pool = ref<boolean>(false)

  const storage = useFirebaseStorage()
  const db = useFirestore()
  const propertiesCollection = useCollection(collection(db, PROPERTIES))

  const deleteItem = async (id: string, imageUrl: string) => {
    const docRef = doc(db, PROPERTIES, id)
    const imageRef = storageRef(storage, imageUrl)

    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })

    if (isConfirmed) {
      Swal.fire('Deleted!', 'Your file has been deleted.', 'success')

      await Promise.all([deleteDoc(docRef), deleteObject(imageRef)])
    }
  }

  const filteredItems = computed(() => {
    return pool.value
      ? propertiesCollection.value.filter((property) => property.pool)
      : propertiesCollection.value
  })

  return { propertiesCollection, filteredItems, pool, deleteItem }
}
