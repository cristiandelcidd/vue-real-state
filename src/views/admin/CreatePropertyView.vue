<script setup lang="ts">
const items = [1, 2, 3, 4, 5, 6]
</script>

<template>
  <v-card max-width="800" flat class="mx-auto my-10">
    <v-card-title class="text-h4 font-weight-bold" tag="h3">New Property</v-card-title>
    <v-card-subtitle class="text-h6 py-5"
      >Create a new property by filling out the following form</v-card-subtitle
    >

    <v-form class="mt-10"
      ><v-text-field label="Property title" class="mb-5" />

      <v-file-input accept="image/jpeg" label="Photo" prepend-icon="mdi-camera" class="mb-5" />

      <v-text-field label="Price" class="mb-5" type="number" />

      <v-row>
        <v-col cols="12" md="4">
          <v-select :items="items" label="Rooms" class="mb-5" />
        </v-col>

        <v-col cols="12" md="4">
          <v-select :items="items" label="WC" class="mb-5" />
        </v-col>

        <v-col cols="12" md="4">
          <v-select :items="items" label="Parking spaces" class="mb-5" />
        </v-col>
      </v-row>

      <v-textarea class="mb-5" label="Description"></v-textarea>
      <v-checkbox label="Pool" />

      <v-btn color="pink-accent-3" block>Add property</v-btn>
    </v-form>
  </v-card>
</template>
