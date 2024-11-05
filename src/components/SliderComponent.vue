<script setup>


defineProps({
  name: {
    type: String,
    default: '',
  },
  modelValue: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  showTextField: {
    type: Boolean,
    default: false,
  },
  showTooltip: {
    type: Boolean,
    default: false,
  },
  tooltipText: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'mdi-information-outline',
  },
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
            v-if="showTooltip"
            :icon="icon"
            size="sm"
            v-bind="props"
          />
        </template>
      </v-tooltip>
    </v-col>
    <v-col cols="12" class="py-0 px-0">
      <v-slider
        :model-value="modelValue"
        :thumb-label="true"
        :min="min"
        :max="max"
        :step="step"
        @update:modelValue="$emit('update:modelValue', $event)"
      >
        <template v-slot:append>
          <v-text-field
            v-if="showTextField"
            readonly
            :model-value="modelValue"
            density="compact"
            type="number"
            variant="outlined"
            style="width: 100px"
          ></v-text-field>
        </template>
      </v-slider>
    </v-col>
  </v-row>
</template>

