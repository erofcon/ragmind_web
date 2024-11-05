<script setup>

import {shallowRef} from "vue";
import KnowledgeBaseCreate from "@/pages/knowledge_base/KnowledgeBaseCreate.vue";

const dialog = shallowRef(false)

</script>

<template>
  <v-dialog
    v-model="dialog"
    max-width="574"
  >
    <template v-slot:activator="{ props: activatorProps }">

      <v-btn
        color="primary"
        prepend-icon="mdi-folder-plus-outline"
        text="Создать базу знаний"
        @click="dialog = true"
      />

    </template>

    <template v-slot:default="{ isActive }">
      <KnowledgeBaseCreate
        @close-dialog="dialog = false"
      />
    </template>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
