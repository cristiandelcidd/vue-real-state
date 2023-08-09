import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import {
  signInWithEmailAndPassword,
  type User,
  onAuthStateChanged,
  type UserCredential,
  signOut
} from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import { useRouter } from 'vue-router'

import type { LoginForm } from '@/views/LoginView.vue'

type ErrorCodes = 'auth/user-not-found' | 'auth/wrong-password' | 'auth/too-many-requests'

export const useAuthStore = defineStore('auth', () => {
  const auth = useFirebaseAuth()

  const errorMessage = ref('')
  const authUser = ref<User | null>(null)

  const router = useRouter()

  const showErrorMessage = computed(() => Boolean(errorMessage.value))

  if (!auth) throw new Error('Auth was not provided!')

  const errorCodes: { [key in ErrorCodes]: string } = {
    'auth/user-not-found': 'User not found!',
    'auth/wrong-password': 'Incorrect password!',
    'auth/too-many-requests':
      'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.'
  }

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) authUser.value = user
    })
  })

  const login = async ({ email, password }: LoginForm) => {
    try {
      const userCredentials: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user: User = userCredentials.user

      authUser.value = user
      router.push({ name: 'admin-properties' })
    } catch (error: any) {
      const { code } = error as { code: ErrorCodes; message: string }

      errorMessage.value = errorCodes[code]

      setTimeout(() => {
        errorMessage.value = ''
      }, 5000)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)

      authUser.value = null
      router.push({ name: 'login' })
    } catch (error) {
      console.log(error)
    }
  }

  const isAuth = computed(() => authUser.value)

  return { login, showErrorMessage, errorMessage, isAuth, logout }
})
