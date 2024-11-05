<script setup>
import {ref, computed, shallowRef} from "vue";
import {formatDate} from "@/utils";
import {KnowledgeBaseStore} from "@/stores/knowledge_base_store";
import AppLayout from "@/layouts/AppLayout.vue";
import KnowledgeBaseCreateDialog from "@/pages/knowledge_base/KnowledgeBaseCreateDialog.vue";
import {NotificationStore} from "@/stores/notification_store";

const knowledgeBaseStore = KnowledgeBaseStore()
const notificationStore = NotificationStore();

const searchQuery = ref("");
const dialog = shallowRef(false)
let deleteKBID = ""

const filteredKbs = computed(() => {
  return knowledgeBaseStore.kbs.filter((kb) =>
    kb.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

async function delete_kb() {
  const result = await knowledgeBaseStore.deleteKB(deleteKBID)

  if (result === 200) {
    notificationStore.showNotification("База знаний успешно удалена!");
  } else {
    notificationStore.showNotification("Произошла ошибка при удалении базы знаний!", "error");
  }

  dialog.value = !dialog.value

}

</script>

<template>
  <AppLayout>
    <template #content>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="searchQuery"
              density="compact"
              variant="outlined"
              placeholder="Поиск ..."
            >
              <template #append>
                <KnowledgeBaseCreateDialog/>
              </template>
            </v-text-field>
          </v-col>

          <v-col
            v-for="(kb, i) in filteredKbs"
            :key="i"
            cols="12"
            sm="4"
          >
            <v-card
              class="mx-auto"
              @click="$router.push('/knowledge_base/'+kb.id)"
              hover
            >
              <template #append>

                <v-btn
                  class="bg-transparent"
                  icon="mdi-dots-horizontal"
                  density="compact"
                  elevation="0"
                >
                  <v-icon icon="mdi-dots-horizontal"></v-icon>
                  <v-menu
                    activator="parent"
                    location="bottom start"
                    transition="fade-transition"
                  >
                    <v-list
                      density="compact"
                      rounded="lg"
                      slim
                    >
                      <v-list-item
                        prepend-icon="mdi-delete-outline"
                        title="Удалить"
                        link
                        class="text-red"
                        @click="()=>{deleteKBID=kb.id, dialog = true}"
                      >

                      </v-list-item>

                    </v-list>
                  </v-menu>
                </v-btn>
              </template>
              <template #title>
                {{ kb.name }}
              </template>
              <v-card-subtitle class="mb-6">
                <p class="me-1 my-1">
                  <v-icon
                    icon="mdi-file-document-outline"
                    size="small"
                  />
                  {{ kb.doc_count }} документов
                </p>
                <p class="me-1">
                  <v-icon
                    icon="mdi-calendar-range"
                    size="small"
                  />
                  {{ formatDate(kb.created_at) }}
                </p>
              </v-card-subtitle>
              <v-card-text v-if="kb.description" class="bg-surface-light pt-4">
                {{ kb.description }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-dialog
          max-width="500"
          v-model="dialog"
        >
          <template v-slot:default="{ isActive }">
            <v-card title="Удаление">
              <v-card-text>
                Вы действительно хотите удалить базу знаний?
                <p class="text-red">При удалении базы знаний связанные чаты будут удалены!</p>

              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text="Удалить"
                  color="red"
                  @click="delete_kb"
                ></v-btn>

                <v-btn
                  text="Отмена"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>

      </v-container>
    </template>
  </AppLayout>
</template>
