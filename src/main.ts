import '@/assets/main.css'
import '@mdi/font/css/materialdesignicons.css'
import 'animate.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Firebase
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from '@/config/firebase'

const vuetify = createVuetify({
  components,
  directives
})

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Firebase
app.use(VueFire, { firebaseApp, modules: [VueFireAuth()] })

app.use(createPinia())
app.use(vuetify)
app.use(router)

app.mount('#app')
