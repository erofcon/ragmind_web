<script setup>
import {ref} from "vue";

import TextFieldComponent from "@/components/TextFieldComponent.vue";
import TextareaComponent from "@/components/TextareaComponent.vue";
import SliderComponent from "@/components/SliderComponent.vue";
import {KnowledgeBaseStore} from "@/stores/knowledge_base_store";
import {NotificationStore} from "@/stores/notification_store";

const emit = defineEmits(['close-dialog']);

const loading = ref(false);

const knowledgeBaseStore = KnowledgeBaseStore()
const notificationStore = NotificationStore();

const name = ref("")
const description = ref("")
const chunk_size = ref(1024)
const overlap = ref(0)
const delimiter = ref("\n|!|\\\\?|;|。|；|！|？")

function closeDialog() {
  emit('close-dialog');
}


const errors = ref({
  name: null,
  delimiter: null
});

function validate() {
  let isValid = true;

  if (!name.value) {
    errors.value.name = "Название обязательно";
    isValid = false;
  } else {
    errors.value.name = null;
  }

  if (!delimiter.value) {
    errors.value.delimiter = "Разделитель обязателен";
    isValid = false;
  } else {
    errors.value.delimiter = null;
  }

  return isValid;
}

async function create() {
  if (validate()) {
    const params = {
      name: name.value,
      description: description.value,
      chunk_size: chunk_size.value,
      overlap: overlap.value,
      delimiter: delimiter.value
    };


    const result = await knowledgeBaseStore.createKB(params)

    if (result === 200) {
      notificationStore.showNotification("База знаний успешно создана!");
    } else {
      notificationStore.showNotification("Произошла ошибка при создании базы знаний!", "error");
    }

    closeDialog()

  }
}

</script>

<template>

  <v-card>
    <v-card-title>
      Создание базы знаний
    </v-card-title>
    <v-card-text class="mx-2">
      <TextFieldComponent
        name="Название"
        v-model="name"
        :error_message="errors.name"
        :error="errors.name===''"
      />

      <TextareaComponent
        name="Описание"
        v-model="description"
      />

      <SliderComponent
        name="Размер разбивки"
        :min="124"
        :max="2024"
        :step="2"
        v-model="chunk_size"
        :show-text-field="true"
      />

      <SliderComponent
        name="Размер перекрытия"
        :min="0"
        :max="100"
        :step="2"
        v-model="overlap"
        :show-text-field="true"
      />

      <TextFieldComponent
        name="Разделитель"
        v-model="delimiter"
        :error_message="errors.delimiter"
        :error="errors.delimiter===''"
      />
    </v-card-text>
    <v-card-actions class="px-8 py-8">
      <v-spacer></v-spacer>

      <v-btn
        text="Отменить"
        variant="text"
        @click="closeDialog"
      ></v-btn>

      <v-btn
        color="surface-variant"
        text="Создать"
        variant="flat"
        @click="create"
        :loading="loading"
      ></v-btn>
    </v-card-actions>
  </v-card>


</template>

<style scoped lang="scss">

</style>
