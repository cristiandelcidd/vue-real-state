<script setup lang="ts">
import { useForm, useField } from 'vee-validate'

import { loginSchema as validationSchema } from '@/validation/loginSchema'
import { useAuthStore } from '@/stores/auth'

export interface LoginForm {
  email: string
  password: string
}

const { handleSubmit } = useForm<LoginForm>({ validationSchema })
const auth = useAuthStore()

const email = useField('email')
const password = useField('password')

const submit = handleSubmit((loginFormValues) => {
  const { email, password } = loginFormValues

  auth.login({ email, password })
})
</script>

<template>
  <v-card flat max-width="600" class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">Login</v-card-title>
    <v-card-subtitle class="text-h6 py-5">Login with your account</v-card-subtitle>

    <v-alert
      v-if="auth.showErrorMessage"
      type="error"
      class="my-5 animate__animated animate__fadeIn"
      :title="auth.errorMessage"
    ></v-alert>

    <v-form class="mt-5">
      <v-text-field
        type="email"
        class="mb-3"
        label="Email"
        placeholder="mail@mail.com"
        bg-color="blue-grey-lighten-5"
        v-model="email.value.value"
        :error-messages="email.errors.value"
      />
      <v-text-field
        type="password"
        class="mb-3"
        label="Password"
        placeholder="********************"
        bg-color="blue-grey-lighten-5"
        v-model="password.value.value"
        :error-messages="password.errors.value"
      />

      <v-btn block color="pink-accent-3" @click="submit" :disabled="auth.showErrorMessage"
        >Login</v-btn
      >
    </v-form>
  </v-card>
</template>
