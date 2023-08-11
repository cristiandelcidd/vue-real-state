<script setup lang="ts">
import { useProperties } from '@/composables/useProperties'
import Property from '@/components/Property.vue'
import type { PropertyFormValues } from '@/types'

const { propertiesCollection } = useProperties()
</script>

<template>
  <h1 class="text-center text-h3 font-weight-bold my-5">Our Properties</h1>

  <v-card flat class="py-10">
    <v-row>
      <Property
        v-for="property in propertiesCollection"
        :key="property.id"
        :property="property as PropertyFormValues"
      />
    </v-row>
  </v-card>
</template>
