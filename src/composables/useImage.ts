import { computed } from 'vue'
import { ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage, useStorageFile } from 'vuefire'
import { v4 as uuidV4 } from 'uuid'

export const useImage = () => {
  const storage = useFirebaseStorage()
  const storageRefPath = storageRef(storage, `/properties/${uuidV4()}`)

  const { url, upload } = useStorageFile(storageRefPath)

  const uploadImage = (e: Event) => {
    const data = (e.target as HTMLInputElement).files![0]

    if (data) upload(data)
  }

  const imageUrl = computed(() => url.value ?? null)

  return { uploadImage, imageUrl, url }
}
