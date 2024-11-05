<script setup>
import {ref, onMounted} from "vue";
import {useRouter, useRoute} from 'vue-router';
import AppLayout from "@/layouts/AppLayout.vue";
import UserMessage from "@/pages/chat/components/UserMessage.vue";
import AssistantMessage from "@/pages/chat/components/AssistantMessage.vue";
import {NotificationStore} from "@/stores/notification_store";

import {chat_api} from "@/api/routes/chat_api";

const notificationStore = NotificationStore();

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const messages = ref([
  {
    "role": "user",
    "content": "Why should I use Pinia?"
  },
  {
    "role": "assistant",
    "content": "Pinia is a store library for Vue, it allows you to share a state across components/pages. If you are familiar with the Composition API, you might be thinking you can already share a global state with a simple export const state = reactive({}). This is true for single page applications but exposes your application to security vulnerabilities if it is server side rendered. But even in small single page applications, you get a lot from using Pinia:\n" +
      "\n" +
      "Testing utilities\n" +
      "Plugins: extend Pinia features with plugins\n" +
      "Proper TypeScript support or autocompletion for JS users\n" +
      "Server Side Rendering support\n" +
      "Devtools support\n" +
      "A timeline to track actions and mutations\n" +
      "Stores appear in components where they are used\n" +
      "Time travel and easier debugging\n" +
      "Hot module replacement\n" +
      "Modify your stores without reloading your page\n" +
      "Keep any existing state while developing\n" +
      "If you still have doubts, check out the official Mastering Pinia course. In the begining we cover how to build our own defineStore() function and then we move to the official Pinia API."
  }
]);

const newMessage = ref("");


async function loadMessages() {

  try {
    const result = await chat_api.get_chat_messages(route.params.id);

    // if (result.status === 200) {
    //   messages.value = result.data;
    // }

    return result.status;

  } catch (error) {
    return 400;
  }


}

function addMessage() {
  if (newMessage.value.trim() === "") return; // Проверка, что текст не пустой

  // Добавляем новое сообщение в массив messages
  messages.value.push({
    role: "user",
    content: newMessage.value
  });

  newMessage.value = ""; // Очистка поля после добавления
}


onMounted(async () => {

  const res = await loadMessages()

  if (res !== 200) {
    notificationStore.showNotification("Произошла ошибка", "error");
    await router.push('/knowledge_base');
  }

  loading.value = false;
})
</script>

<template>
  <AppLayout>
    <template #content>

      <v-container class="w-md-66 w-100 mx-auto mb-5">
        <v-skeleton-loader
          :loading="loading"
          type="list-item-three-line"
          color="transparent"
        >
          <v-row>
            <v-col
              v-for="(message, index) in messages"
              :key="index"
              cols="12"
            >
              <UserMessage
                v-if="message.role==='user'"
                :message="message.content"
              />
              <AssistantMessage
                v-if="message.role==='assistant'"
                :message="message.content"
              />
            </v-col>
          </v-row>
        </v-skeleton-loader>
      </v-container>
    </template>

    <template #footer>
      <v-card class="w-md-66 w-100 mx-auto mb-5" elevation="0">
        <v-row no-gutters align="center">
          <v-col cols="10">
            <v-text-field
              v-model="newMessage"
              :disabled="loading"
              type="text"
              bg-color="gray_1"
              density="compact"
              label="Сообщить GPT"
              variant="solo"
              hide-details
              single-line
              @keydown.enter="addMessage"
            >
              <template #append>
                <v-btn
                  color="primary"
                  text="Отправить"
                  :disabled="loading || !newMessage.trim()"
                  @click="addMessage"
                />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </template>
  </AppLayout>
</template>

<style scoped lang="scss">

</style>
