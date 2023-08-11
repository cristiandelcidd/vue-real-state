<script setup lang="ts">
import { useForm, useField } from 'vee-validate'
import { collection, addDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { useRouter } from 'vue-router'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'

import 'leaflet/dist/leaflet.css'

import { validationSchema, imageSchema } from '@/validation/propertySchema'
import { useImage } from '@/composables/useImage'
import { useLocationMap } from '@/composables/useLocationMap'
import { PROPERTIES } from '@/constants'
import type { PropertyFormValues } from '@/types'

const { handleSubmit } = useForm<PropertyFormValues>({
  validationSchema: { ...validationSchema, ...imageSchema }
})

const items = [1, 2, 3, 4]

const { uploadImage, imageUrl, url } = useImage()
const { zoom, center, pin } = useLocationMap()

const db = useFirestore()

const router = useRouter()

const title = useField<string>('title')
const price = useField<string>('price')
const image = useField<File[]>('image')
const rooms = useField<number>('rooms')
const wc = useField<number>('wc')
const parkingLot = useField<number>('parkingLot')
const description = useField<string>('description')
const pool = useField<boolean>('pool', {}, { initialValue: false })

const submit = handleSubmit(async (propertyFormValues) => {
  const { image, ...property } = propertyFormValues

  const docRef = await addDoc(collection(db, PROPERTIES), {
    ...property,
    image: url.value,
    location: center.value
  })

  if (docRef.id) router.push({ name: 'admin-properties' })
})
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">New Property</v-card-title>
    <v-card-subtitle class="text-h6 py-5"
      >Create a new property by filling out the following form</v-card-subtitle
    >

    <v-form class="mt-10"
      ><v-text-field
        label="Property title"
        class="mb-5"
        v-model="title.value.value"
        :error-messages="title.errors.value"
      />

      <v-file-input
        accept="image/jpeg"
        label="Photo"
        prepend-icon="mdi-camera"
        class="mb-5"
        v-model="image.value.value"
        :error-messages="image.errors.value"
        @change="uploadImage"
      />

      <div v-if="imageUrl" class="my-5">
        <p class="font-weight-bold mb-2">Image</p>
        <img class="w-50" :src="imageUrl" />
      </div>

      <v-text-field
        label="Price"
        class="mb-5"
        type="number"
        v-model="price.value.value"
        :error-messages="price.errors.value"
      />

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            :items="items"
            label="Rooms"
            class="mb-5"
            v-model="rooms.value.value"
            :error-messages="rooms.errors.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            :items="items"
            label="WC"
            class="mb-5"
            v-model="wc.value.value"
            :error-messages="wc.errors.value"
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            :items="items"
            label="Parking spaces"
            class="mb-5"
            v-model="parkingLot.value.value"
            :error-messages="parkingLot.errors.value"
          />
        </v-col>
      </v-row>

      <v-textarea
        class="mb-5"
        label="Description"
        v-model="description.value.value"
        :error-messages="description.errors.value"
      ></v-textarea>

      <v-checkbox label="Pool" v-model="pool.value.value" />

      <h2 class="font-weight-bold text-center my-5">Location</h2>
      <div class="pb-10">
        <div style="height: 600px">
          <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center" :draggable="true" @moveend="pin" />
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></LTileLayer>
          </LMap>
        </div>
      </div>

      <v-btn color="pink-accent-3" block @click="submit">Add property</v-btn>
    </v-form>
  </v-card>
</template>
