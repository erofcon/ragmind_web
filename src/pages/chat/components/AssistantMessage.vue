<script setup>
import {defineProps, ref} from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true
  }
});

const tooltipText = ref("Копировать");

function copyText() {
  navigator.clipboard.writeText(props.message).then(() => {
    tooltipText.value = "Скопировано";
    setTimeout(() => {
      tooltipText.value = "Копировать";
    }, 1000);
  });
}
</script>

<template>
  <v-row>
    <v-col cols="auto">
      <v-avatar size="40">
        <v-icon size="40" color="primary" icon="mdi-google-assistant"/>
      </v-avatar>
    </v-col>
    <v-col>
      <v-row>
        <v-col>
          <v-tooltip
            max-width="300"
            location="top"
            :text="tooltipText">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                density="comfortable"
                elevation="0"
                icon="mdi-content-copy"
                @click="copyText"/>
            </template>
          </v-tooltip>

          <!-- Остальные кнопки с тултипами -->
          <v-tooltip max-width="300" location="top" text="База знаний">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" density="comfortable" elevation="0" icon="mdi-lightbulb-outline"/>
            </template>
          </v-tooltip>

          <v-tooltip max-width="300" location="top" text="Источники">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" density="comfortable" elevation="0" icon="mdi-source-branch"/>
            </template>
          </v-tooltip>

          <v-tooltip max-width="300" location="top" text="Удалить">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" density="comfortable" elevation="0" icon="mdi-delete-outline"/>
            </template>
          </v-tooltip>

          <v-tooltip max-width="300" location="top" text="Сменить модель">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" density="comfortable" elevation="0" icon="mdi-sync"/>
            </template>
          </v-tooltip>

        </v-col>
        <v-col cols="12" class="py-0">
        <pre
          v-html="props.message"
        />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: monospace;
  font-size: 1rem;
  line-height: 1.5;
}
</style>
