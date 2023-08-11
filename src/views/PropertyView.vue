<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDocument, useFirestore } from 'vuefire'
import { doc } from 'firebase/firestore'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'

import 'leaflet/dist/leaflet.css'

import { useLocationMap } from '@/composables/useLocationMap'
import { PROPERTIES } from '@/constants'
import type { PropertyFormValues } from '@/types'
import { propertyPrice } from '@/helpers'

const route = useRoute()

const { center, zoom } = useLocationMap()

const documentId = route.params.id as string

const db = useFirestore()
const docRef = doc(db, PROPERTIES, documentId)

const property = useDocument<PropertyFormValues>(docRef)

watch(property, (property) => {
  if (property) {
    center.value = property.location
  }
})
</script>

<template>
  <v-card flat v-if="property">
    <v-card-title class="mt-5 text-h3 text-center py-5 font-weight-bold">
      {{ property.title }}
    </v-card-title>
    <v-img :src="property.image as string" :alt="property.title" height="550" />

    <div class="bg-blue-grey-lighten-4 d-flex flex-column flex-md-row align-center">
      <v-card-text
        >Price:
        <span class="font-weight-bold">{{ propertyPrice(property.price) }}</span></v-card-text
      >
      <v-card-text
        >Rooms: <span class="font-weight-bold">{{ property.rooms }}</span></v-card-text
      >
      <v-card-text
        >Parking Lots: <span class="font-weight-bold">{{ property.parkingLot }}</span></v-card-text
      >
      <v-card-text
        >Bathrooms: <span class="font-weight-bold">{{ property.wc }}</span></v-card-text
      >
    </div>

    <v-row>
      <v-col cols="12" md="8">
        <div class="text-pre-wrap py-10">
          {{ property.description }}
        </div>
      </v-col>

      <v-col cols="12" md="4">
        <div style="height: 600px">
          <LMap v-model:zoom="zoom" :center="center" :use-global-leaflet="false">
            <LMarker :lat-lng="center">
              <LPopup>
                {{ property.title }}
              </LPopup>
            </LMarker>
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></LTileLayer>
          </LMap>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<style>
.text-pre-wrap {
  white-space: pre-wrap;
}
</style>
