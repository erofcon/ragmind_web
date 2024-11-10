<script setup>
import {defineProps, ref, watch} from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  kb_content: {
    type: String,
    default: ""
  },
  sources: {
    type: Object,
    default: null
  }
});

const modifiedMessage = ref(props.message);

const tooltipText = ref("Копировать");
const getSource = ref(false)

watch(() => props.message, (newMessage) => {
  modifiedMessage.value = newMessage + " дополнительный текст";
});

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

          <v-tooltip max-width="300" location="top" text="База знаний">
            <template v-slot:activator="{ props }">
              <v-dialog max-width="50%">
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    :disabled="kb_content===''"
                    v-bind="activatorProps, props"
                    density="comfortable"
                    elevation="0"
                    icon="mdi-lightbulb-outline"
                  ></v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                  <v-card>
                    <v-card-text>
                      {{ kb_content }}
                    </v-card-text>
                  </v-card>
                </template>
              </v-dialog>
            </template>
          </v-tooltip>


          <v-tooltip
            max-width="300"
            location="top"
            text="Источники"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                :disabled="!sources"
                v-bind="props"
                density="comfortable"
                elevation="0"
                icon="mdi-source-branch"
                @click="getSource=!getSource"
              />
            </template>
          </v-tooltip>
        </v-col>
        <v-col cols="12" class="py-0">
          <span>
             {{ props.message }}
          </span>
        </v-col>

        <v-col
          v-if="getSource"
        >
          <v-card
            max-width="300"
          >
            <v-list
              v-for="source in sources"
              :key="source.id"
              density="compact"
            >

              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-text-box-outline"></v-icon>
                </template>

                <v-list-item-title>
                  {{ source.name }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>

      </v-row>
    </v-col>
  </v-row>
</template>

<style scoped lang="scss">
.pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: monospace;
  font-size: 1rem;
  line-height: 1.5;
}
</style>
