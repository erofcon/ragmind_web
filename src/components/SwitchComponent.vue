<script setup>

defineProps({
  name: {
    type: String,
    default: 'Slider Name',
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
    default: 'mdi-information-outline',
  },
  color: {
    type: String,
    default: 'primary',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  tooltipText: {
    type: String,
    default: '',
  },
  showTooltip: {
    type: Boolean,
    default: false,
  }
});

defineEmits(['update:modelValue']);

</script>/

<template>

  <v-row>
    <v-col cols="auto" class="px-0 py-0">
      {{ name }}
    </v-col>
    <v-col cols="auto" v-if="showTooltip && tooltipText" class="py-0 px-1 cursor-help">
      <v-tooltip max-width="300" location="top" :text="tooltipText">
        <template v-slot:activator="{ props }">
          <v-icon
            v-if="showIcon"
            :icon="icon"
            size="sm"
            v-bind="props"
          />
        </template>
      </v-tooltip>
    </v-col>
    <v-col cols="12" class="py-0 px-0">
      <v-switch
        :model-value="modelValue"
        @update:modelValue="$emit('update:modelValue', !modelValue)"
        :color="color"
        hide-details
      />
    </v-col>
  </v-row>

</template>

