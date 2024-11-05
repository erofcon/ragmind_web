<script setup>
import {ref} from "vue";
import {useRouter} from 'vue-router';

import {KnowledgeBaseStore} from "@/stores/knowledge_base_store";
import {NotificationStore} from "@/stores/notification_store";
import {ChatStore} from "@/stores/chat_store";

import SliderComponent from "@/components/SliderComponent.vue";
import SwitchComponent from "@/components/SwitchComponent.vue";
import TextareaComponent from "@/components/TextareaComponent.vue";
import TextFieldComponent from "@/components/TextFieldComponent.vue";
import SelectComponent from "@/components/SelectComponent.vue";


const notificationStore = NotificationStore();
const chatStore = ChatStore();


import config from "@/config";

const tab = ref(1);

const router = useRouter();
// chat settings


const props = defineProps({
  type: {
    type: String,
    default: "create",
  },
  name: {
    type: String,
    default: "",
  },
  kb_id: {
    type: String,
    default: "",
  },
  chat_id: {
    type: String,
    default: "",
  },
  system_prompt: {
    type: String,
    default: config.DEFAULT_SYSTEM_PROMPT,
  },
  system_rag_prompt: {
    type: String,
    default: config.DEFAULT_SYSTEM_RAG_PROMPT
  },
  threshold: {
    type: Number,
    default: config.DEFAULT_THRESHOLD,
  },
  topK: {
    type: Number,
    default: config.DEFAULT_TOP_K,
  },
  useRerank: {
    type: Boolean,
    default: config.DEFAULT_USE_RERANK,
  },

  temperatureValue: {
    type: Number,
    default: config.DEFAULT_TEMPERATURE_VALUE,
  },
  topPValue: {
    type: Number,
    default: config.DEFAULT_TOP_P_VALUE,
  },
  presencePenaltyValue: {
    type: Number,
    default: config.DEFAULT_PRESENCE_PENALTY_VALUE,
  },
  frequencyPenaltyValue: {
    type: Number,
    default: config.DEFAULT_FREQUENCY_PENALTY_VALUE,
  },
  maxTokensValue: {
    type: Number,
    default: config.DEFAULT_MAX_TOKENS_VALUE,
  },
});


const name = ref(props.name);
const selectedKB = ref(props.kb_id);

// prompt settings


const system_prompt = ref(props.system_prompt);

const system_rag_prompt = ref(props.system_rag_prompt);

const threshold = ref(props.threshold);
const topK = ref(props.topK);
const useRerank = ref(props.useRerank);

// model settings
const temperatureValue = ref(props.temperatureValue);
const topPValue = ref(props.topPValue);
const presencePenaltyValue = ref(props.presencePenaltyValue);
const frequencyPenaltyValue = ref(props.frequencyPenaltyValue);
const maxTokensValue = ref(props.maxTokensValue);


const emit = defineEmits(['close-dialog']);

const knowledgeBaseStore = KnowledgeBaseStore()


function closeDialog() {
  emit('close-dialog');
}


const RerankSwitch = () => {
  useRerank.value = !useRerank.value;
};

const errors = ref({
  name: null,
  kb_id: null,
  rag_system: null,
  system: null,
});

function validate() {
  let isValid = true;

  if (!name.value) {
    errors.value.name = "Название обязательно";
    isValid = false;
  } else {
    errors.value.name = null;
  }

  if (!selectedKB.value) {
    errors.value.kb_id = "База знаний не выбрана";
    isValid = false;
  } else {
    errors.value.kb_id = null;
  }

  if (!system_rag_prompt.value) {
    errors.value.rag_system = "Обезательно для заполнения";
    isValid = false;
  } else {
    errors.value.rag_system = null;
  }

  if (!system_prompt.value) {
    errors.value.system = "Обезательно для заполнения";
    isValid = false;
  } else {
    errors.value.system = null;
  }

  return isValid;
}

async function createChat() {

  if (validate()) {
    const params = {
      name: name.value,
      kb_id: selectedKB.value,
      m_settings: {
        temperature: temperatureValue.value,
        top_p: topPValue.value,
        max_tokens: maxTokensValue.value,
        presence_penalty: presencePenaltyValue.value,
        frequency_penalty: frequencyPenaltyValue.value,
      },
      prompt_engine: {
        rag_system: system_rag_prompt.value,
        system: system_prompt.value,
        threshold: threshold.value,
        k: topK.value,
        user_rerank: useRerank.value,
      }
    }

    let result = 400

    if (props.type === 'create') {
      result = await chatStore.createChat(params)
    } else if (props.type === 'update') {
      result = await chatStore.updateChat(props.chat_id, params)
    }


    if (result === 200) {
      notificationStore.showNotification("Чат успешно создан!");
    } else {
      notificationStore.showNotification("Произошла ошибка при создании!", "error");
    }

    closeDialog()
  }

}

async function deleteChat() {

  const result = await chatStore.deleteChat(props.chat_id)

  if (result === 200) {
    notificationStore.showNotification("Чат успешно удален!");
  } else {
    notificationStore.showNotification("Произошла ошибка!", "error");
  }

  await router.push('/knowledge_base');

  closeDialog()
}


</script>

<template>
  <v-card title="Конфигурация чата">
    <template v-slot:text>
      <v-tabs
        v-model="tab"
        align-tabs="center"
      >
        <v-tab prepend-icon="mdi-list-box-outline" :value="1">Настройки чата</v-tab>
        <v-tab prepend-icon="mdi-dots-circle" :value="2">Настройки промпта</v-tab>
        <v-tab prepend-icon="mdi-cog-outline" :value="3">Настройки модели</v-tab>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item :value="1">
          <v-container class="mx-8 mt-4">
            <TextFieldComponent
              class="w-75"
              name="Название"
              v-model="name"
              :error_message="errors.name"
              :error="errors.name===''"
            />
            <SelectComponent
              class="w-75"
              name="База знаний"
              :items="knowledgeBaseStore.kbs"
              v-model="selectedKB"
              :error_message="errors.kb_id"
              :error="errors.kb_id===''"
            />

          </v-container>
        </v-tabs-window-item>
        <v-tabs-window-item :value="2">
          <v-container class="mx-8 mt-4">

            <TextareaComponent
              class="w-75"
              name="Системный промпт"
              v-model="system_prompt"
              :error_message="errors.system"
              :error="errors.system===''"
            />

            <TextareaComponent
              class="w-75"
              name="Системный промпт для RAG"
              v-model="system_rag_prompt"
              :error_message="errors.rag_system"
              :error="errors.rag_system===''"
            />

            <SliderComponent
              v-model=threshold
              :min="0.0"
              :max="1.0"
              :step="0.01"
              :show-tooltip="true"
              :show-text-field="true"
              class="w-75"
              name="Similarity threshold"
              :showTooltip="true"
              tooltipText="Мы используем гибридную оценку сходства для оценки расстояния между двумя строками текста.
                      Это взвешенное сходство ключевых слов и сходство векторного косинуса.
                      Если сходство между запросом и фрагментом меньше этого порога, фрагмент будет отфильтрован."

            />

            <SliderComponent
              v-model=topK
              :min="1"
              :max="100"
              :step="1"
              :show-tooltip="true"
              :show-text-field="true"
              class="w-75"
              name="Top K"
              :showTooltip="true"
              tooltipText="Мы используем гибридную оценку сходства для оценки расстояния между двумя строками текста.
                      Это взвешенное сходство ключевых слов и сходство векторного косинуса.
                      Если сходство между запросом и фрагментом меньше этого порога, фрагмент будет отфильтрован."

            />

            <SwitchComponent
              class="w-25"
              name="User Rerank model"
              :showTooltip="true"
              :model-value="useRerank"
              @click="RerankSwitch"
              tooltip-text="Он использует встраивания запроса и фрагментов для вычисления сходства векторного косинуса.
                В противном случае вместо векторного косинусного сходства используется оценка переранга."

            />
          </v-container>

        </v-tabs-window-item>
        <v-tabs-window-item :value="3">
          <v-container class="mx-8 mt-4">

            <SliderComponent
              v-model=temperatureValue
              :min="0.0"
              :max="1.0"
              :step="0.01"
              :show-tooltip="true"
              :show-text-field="true"
              class="w-75"
              name="Температура"
              :showTooltip="true"
              tooltip-text="Этот параметр управляет случайностью прогнозов модели.
                Более низкая температура делает модель более уверенной в своих реакциях,
                а более высокая — более креативной и разнообразной."
            />

            <SliderComponent
              v-model="topPValue"
              :min="0.0"
              :max="1.0"
              :step="0.01"
              class="w-75"
              name="Top P"
              :showTooltip="true"
              :show-text-field="true"
              tooltip-text="Этот параметр, также известный как «nucleus sampling», устанавливает порог для выбора меньшего набора слов для выборки.
                Он фокусируется на наиболее вероятных словах, отсекая менее вероятные."
            />

            <SliderComponent
              v-model="maxTokensValue"
              :min="0"
              :max="8192"
              :step="2"
              class="w-75"
              name="Максимальное колличество токенов"
              :show-tooltip="true"
              :show-text-field="true"
              tooltip-text="Это устанавливает максимальную длину вывода модели, измеряемую количеством
                токенов (слов или фрагментов слов)."
            />

            <SliderComponent
              v-model="presencePenaltyValue"
              :min="0.0"
              :max="1.0"
              :step="0.01"
              class="w-75"
              name="Presence penalty"
              :showTooltip="true"
              :show-text-field="true"
              tooltip-text="Это удерживает модель от повторения одной и той же информации, наказывая слова,
                которые уже появлялись в разговоре."
            />

            <SliderComponent
              v-model="frequencyPenaltyValue"
              :min="0.0"
              :max="1.0"
              :step="0.01"
              class="w-75"
              name="Frequency penalty"
              :showTooltip="true"
              :show-text-field="true"
              tooltip-text="Подобно штрафу за присутствие,
                это уменьшает склонность модели часто повторять одни и те же слова."
            />

          </v-container>
        </v-tabs-window-item>
      </v-tabs-window>
    </template>

    <v-card-actions class="px-8 py-8">
      <v-spacer></v-spacer>

      <v-btn
        v-if="props.type==='update'"
        text="Удалить"
        variant="text"
        color="red"
        @click="deleteChat"
      ></v-btn>


      <v-btn
        text="Отменить"
        variant="text"
        @click="closeDialog"
      ></v-btn>

      <v-btn
        color="surface-variant"
        :text="props.type==='update'?'Обновить':'Создать'"
        variant="flat"
        @click="createChat"
      ></v-btn>
    </v-card-actions>
  </v-card>

</template>

<style scoped lang="scss">

</style>
