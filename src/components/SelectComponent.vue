<script setup>

defineProps({
  name: {
    type: String,
    default: '',
  },
  modelValue: {},
  items: {
    type: Array,
    default: [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  error_message: {
    type: String,
    default: '',
  }
});

</script>/

<template>

  <v-row>
    <v-col class="px-0 py-0">
      {{ name }}
    </v-col>
    <v-col cols="12" class="py-0 px-0 pt-2">
      <v-select
        :error="error"
        :error-messages="error_message"
        :model-value="modelValue"
        :items="items"
        :disabled="disabled"
        item-title="name"
        item-value="id"
        density="compact"
        variant="outlined"
        @update:model-value="$emit('update:modelValue', $event)"
      />
    </v-col>
  </v-row>
</template>

<!--@update:modelValue="$emit('update:modelValue', $event)"-->
<!--@update:modelValue="$emit('update:modelValue', $event)"-->
