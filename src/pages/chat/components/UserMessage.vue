<script setup>
import {defineProps} from "vue";


defineProps({
  message: {
    type: String,
    required: true
  }
})

</script>

<template>
  <div class="user-input float-end text-end my-3 bg-gray_1 rounded pa-4">
    <pre v-html="message"/>
  </div>
</template>

<style scoped lang="scss">

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: monospace;
  font-size: 1rem;
  line-height: 1.5;
}

.user-input {
  max-width: 65%;
}

</style>
