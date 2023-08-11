<script setup lang="ts">
import type { PropertyFormValues } from '@/types'
import { propertyPrice } from '../helpers'

interface Props {
  property: PropertyFormValues
}

defineProps<Props>()
</script>

<template>
  <v-col cols="12" md="4">
    <v-card>
      <v-img :src="property.image as string" height="250" cover></v-img>
      <v-card-title>{{ property.title }}</v-card-title>

      <v-card-text class="text-truncate">{{ property.description }}</v-card-text>
      <v-card-text class="text-h5 font-weight-bold"
        >Price: {{ propertyPrice(property.price) }}</v-card-text
      >

      <template v-slot:actions>
        <v-btn
          block
          color="info"
          variant="flat"
          :to="{ name: 'property', params: { id: property.id } }"
          >See information</v-btn
        >
      </template>
    </v-card>
  </v-col>
</template>
