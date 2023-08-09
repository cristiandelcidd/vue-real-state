import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { signInWithEmailAndPassword, type User } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'

import type { LoginForm } from '@/views/LoginView.vue'

type ErrorCodes = 'auth/user-not-found' | 'auth/wrong-password' | 'auth/too-many-requests'

export const authStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()

  const errorMessage = ref('')
  const authUser = ref({} as User)

  const showErrorMessage = computed(() => Boolean(errorMessage.value))

  if (!auth) throw new Error('Auth was not provided!')

  const errorCodes: { [key in ErrorCodes]: string } = {
    'auth/user-not-found': 'User not found!',
    'auth/wrong-password': 'Incorrect password!',
    'auth/too-many-requests':
      'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
  }

  const login = async ({ email, password }: LoginForm) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password)

      const user = userCredentials.user

      authUser.value = user
    } catch (error: any) {
      const { code } = error as { code: ErrorCodes; message: string }

      errorMessage.value = errorCodes[code]

      setTimeout(() => {
        errorMessage.value = ''
      }, 5000)
    }
  }

  return { login, showErrorMessage, errorMessage }
})
