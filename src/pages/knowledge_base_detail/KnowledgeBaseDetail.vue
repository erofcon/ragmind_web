<script setup>

import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';

import AppLayout from "@/layouts/AppLayout.vue";
import Dataset from "@/pages/knowledge_base_detail/components/Dataset.vue";
import RetrievalTesting from "@/pages/knowledge_base_detail/components/RetrievalTesting.vue";
import Configuration from "@/pages/knowledge_base_detail/components/Configuration.vue";
import {NotificationStore} from "@/stores/notification_store";
import {document_api} from "@/api/routes/document_api";


const notificationStore = NotificationStore();
const route = useRoute();

const staticItem = {
  title: 'База знаний',
  disabled: false,
  href: '/knowledge_base',
};

const tab = ref(1);


const currentTitle = computed(() => {
  switch (tab.value) {
    case 1:
      return 'Dataset';
    case 2:
      return 'Retrieval testing';
    case 3:
      return 'Configuration';
    default:
      return 'Dataset';
  }
});

const currentComponent = computed(() => {
  switch (tab.value) {
    case 1:
      return Dataset;
    case 2:
      return RetrievalTesting;
    case 3:
      return Configuration;
    default:
      return Dataset;
  }
});


const breadcrumbItems = computed(() => [staticItem, {title: currentTitle.value}]);

const selectedFiles = ref([]);
const documents = ref([]);
const loading = ref(true);


async function uploadFiles() {
  try {
    const result = await document_api.upload_document(route.params.id, selectedFiles.value);

    if (result.status === 200) {

      for (let i = 0; i < result.data.length; i++) {
        documents.value.push(result.data[i]);
      }

      notificationStore.showNotification("Файлы успешно загружены!");
    } else {
      notificationStore.showNotification("Произошла ошибка при загрузке файлов!", "error");
    }

  } catch (e) {
    notificationStore.showNotification("Произошла ошибка при загрузке файлов!", "error");
  }

  selectedFiles.value = [];
}


async function docDelete(values) {

  try {

    for (let i = 0; i < values.length; i++) {

      const result = await document_api.delete_document(route.params.id, values[i]);

      if (result.status === 200) {
        documents.value = documents.value.filter(doc => doc.id !== values[i]);
      }
    }

    notificationStore.showNotification("Успешно удалено", "success");

  } catch (e) {
    notificationStore.showNotification("Произошла ошибка при удалении", "error");
  }
}


async function runDoc(values) {


  try {
    for (let i = 0; i < values.length; i++) {
      await document_api.create_chunks(route.params.id, values[i]);
    }

    notificationStore.showNotification("Запущено", "success");

  } catch (e) {
    notificationStore.showNotification("Произошла ошибка при запуске", "error");
  }
}

onMounted(async () => {
  try {
    const result = await document_api.get_document_list(route.params.id)

    if (result.status === 200) {
      documents.value = result.data;
    } else {
      notificationStore.showNotification("Произошла ошибка при загрузке", "error");
    }

  } catch (e) {
    notificationStore.showNotification("Произошла ошибка при загрузке", "error");
  }

  loading.value = false

})


</script>

<template>
  <AppLayout>
    <template #content>

      <v-skeleton-loader
        v-if="loading"
        type="table"
        color="transparent"
      />


      <v-container
        v-else
      >
        <v-breadcrumbs :items="breadcrumbItems">
          <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
          </template>
        </v-breadcrumbs>


        <v-file-input
          class="my-4"
          v-model="selectedFiles"
          label="Загрузка документов"
          variant="outlined"
          density="compact"
          accept=".txt"
          multiple
          show-size
        >
          <template #append>
            <v-btn
              color="primary"
              @click="uploadFiles"
              :disabled="!selectedFiles.length"
            >
              Загрузить
            </v-btn>
          </template>
        </v-file-input>

        <v-card
          elevation="0"
          color="transparent"
        >
          <v-tabs
            v-model="tab"
            align-tabs="start"
          >
            <v-tab prepend-icon="mdi-list-box-outline" :value="1">Dataset</v-tab>
            <v-tab prepend-icon="mdi-dots-circle" :value="2">Retrieval testing</v-tab>
            <v-tab prepend-icon="mdi-cog-outline" :value="3">Configuration</v-tab>
          </v-tabs>

          <v-tabs-window v-model="tab">
            <v-tabs-window-item
              v-for="n in 3"
              :key="n"
              :value="n"
            >
              <v-container fluid>

                <component
                  :is="currentComponent"
                  :documents="documents"
                  @deleteDoc="docDelete"
                  @runDoc="runDoc"/>

              </v-container>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card>

      </v-container>
    </template>
  </AppLayout>
</template>

<style scoped lang="scss">

</style>
