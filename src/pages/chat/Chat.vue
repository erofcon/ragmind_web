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
const sending = ref(false);
const messages = ref([]);
const newMessage = ref("");

let assistantMessageIndex = null;
let isStreaming = false;

async function loadMessages() {

  try {
    const result = await chat_api.get_chat_messages(route.params.id);

    if (result.status === 200) {
      messages.value = result.data;
    }

    return result.status;

  } catch (error) {
    return 400;
  }


}

function addMessage() {
  if (newMessage.value.trim() === "") return;

  messages.value.push({
    role: "user",
    content: newMessage.value
  });

  newMessage.value = "";
}

async function generation() {
  if (newMessage.value.trim() === "") return;

  const body = {
    role: "user",
    content: newMessage.value
  }

  messages.value.push(body)

  newMessage.value = "";

  const result = await chat_api.generation_message(
    route.params.id,
    body,
    false,
    false,
    false
  )

  if (result.status === 200) {
    messages.value.push(result.data);
  }

}

async function generation_message() {
  if (newMessage.value.trim() === "") return;

  const newMsg = {
    role: "user",
    content: newMessage.value
  }
  messages.value.push(newMsg);

  newMessage.value = "";

  sending.value = true;
  isStreaming = true;

  const url = new URL('http://localhost:8000/api/v1/chat/generation');

  url.searchParams.append('chat_id', route.params.id.toString());
  url.searchParams.append('user_rag', false);
  url.searchParams.append('extract_keywords', false);
  url.searchParams.append('stream', true);


  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMsg)
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  messages.value.push({role: 'assistant', content: ''});
  console.log(messages.value.length)
  console.log(messages.value[25])
  assistantMessageIndex = messages.value.length - 1;

  const readChunk = async ({done, value}) => {
    if (done || !isStreaming) {
      isStreaming = false;
      return;
    }

    const decodedMessage = decoder.decode(value, {stream: true});
    console.log(decodedMessage)
    messages.value[assistantMessageIndex].content += decodedMessage;

    const nextChunk = await reader.read();
    await readChunk(nextChunk);
  };

  // const initialChunk = await reader.read();
  // await readChunk(initialChunk);

  sending.value = false;

}


// fetch('/api/v1/chat/generation', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ chat_id, message })
// })
//   .then(response => {
//     const reader = response.body.getReader();
//     let isFirstChunk = true;
//
//     reader.read().then(function processText({ done, value }) {
//       if (done) return;
//
//       const text = new TextDecoder().decode(value);
//       if (isFirstChunk) {
//         const metadata = JSON.parse(text); // Обработка первых данных как метаданных
//         console.log("Metadata:", metadata);
//         isFirstChunk = false;
//       } else {
//         const content = JSON.parse(text); // Следующие данные — это content
//         console.log("Content chunk:", content.content);
//       }
//
//       return reader.read().then(processText);
//     });
//   });


onMounted(async () => {
  const res = await loadMessages()

  if (res !== 200) {
    notificationStore.showNotification("Произошла ошибка", "error");
    await router.push('/knowledge_base');
  }

  loading.value = false;
  console.log(messages.value)
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
              :disabled="loading || sending"
              type="text"
              bg-color="gray_1"
              density="compact"
              label="Сообщить GPT"
              variant="solo"
              hide-details
              single-line
              @keydown.enter="generation"
            >
              <template #prepend>
                <v-btn
                  icon="mdi-cog-outline"
                  density="compact"
                  elevation="0"
                />
              </template>
              <template #append>
                <v-btn
                  color="primary"
                  text="Отправить"
                  :disabled="loading || !newMessage.trim() || sending"
                  @click="generation"
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
