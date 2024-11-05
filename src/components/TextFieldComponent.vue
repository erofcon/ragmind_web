<script setup>

defineProps({
  name: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
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


</script>

<template>

  <v-row>
    <v-col class="px-0 py-0">
      {{ name }}
    </v-col>
    <v-col cols="12" class="py-0 px-0 pt-2">
      <v-text-field
        :error="error"
        :error-messages="error_message"
        density="compact"
        variant="outlined"
        :model-value="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </v-col>
  </v-row>
</template>

