<script setup lang="ts">
import { useProperties } from '@/composables/useProperties'
import { propertyPrice } from '@/helpers'

const { propertiesCollection } = useProperties()
</script>

<template>
  <h2 class="text-center text-h3 my-5 font-weight-bold">Admin Panel</h2>

  <v-btn color="blue" variant="flat" :to="{ name: 'create-property' }">Create Property</v-btn>

  <v-card class="mx-auto mt-10">
    <v-list>
      <v-list-item v-for="property in propertiesCollection" :key="property.id" border>
        <template v-slot:prepend>
          <v-list-item-media start>
            <img width="180" :src="property.image" :alt="property.title" />
          </v-list-item-media>
        </template>

        <v-list-item-title>{{ property.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ propertyPrice(property.price) }}</v-list-item-subtitle>

        <template v-slot:append>
          <v-btn
            color="info"
            flat
            class="mr-2"
            :to="{ name: 'edit-property', params: { id: property.id } }"
            >Edit</v-btn
          >

          <v-btn color="red-darken-3" flat>Remove</v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>
