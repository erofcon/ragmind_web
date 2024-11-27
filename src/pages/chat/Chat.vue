<script setup>
import {ref, onMounted, onUpdated} from "vue";
import {useRouter, useRoute} from 'vue-router';
import AppLayout from "@/layouts/AppLayout.vue";
import UserMessage from "@/pages/chat/components/UserMessage.vue";
import AssistantMessage from "@/pages/chat/components/AssistantMessage.vue";
import {NotificationStore} from "@/stores/notification_store";

import {chat_api} from "@/api/routes/chat_api";
import SwitchComponent from "@/components/SwitchComponent.vue";

const notificationStore = NotificationStore();

const router = useRouter();
const route = useRoute();
const stream = ref(true)
const extractKeywords = ref(true)
const useRag = ref(true)

const loading = ref(true);
const gen = ref(false);
const messages = ref([]);
const newMessage = ref("");


const extractKeywordsSwitch = () => {
  extractKeywords.value = !extractKeywords.value;
};

const useRagSwitch = () => {
  useRag.value = !useRag.value;
};


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

async function generation() {
  if (newMessage.value.trim() === "") return;

  gen.value = true;
  const body = {
    role: "user",
    content: newMessage.value
  };

  // Add user message to the list
  messages.value.push(body);
  newMessage.value = ""; // Clear input field

  try {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/chat/generation?chat_id=${route.params.id}&use_rag=${useRag.value}&extract_keywords=${extractKeywords.value}&stream=${stream.value}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let isFirstChunk = true;
    let accumulatedContent = ""; // Temporary holder for content

    reader.read().then(function processText({done, value}) {
      if (done) {
        gen.value = false;
        return;
      }

      // Decode the chunk

      // const text = new TextDecoder().decode(value);
      const decodedMessage = decoder.decode(value, {stream: true});

      if (isFirstChunk) {
        const metadata = JSON.parse(decodedMessage); // Process the first chunk as metadata
        console.log("Metadata:", metadata);

        // Add metadata message entry with empty content
        messages.value.push({
          role: "assistant",
          content: "",
          metadata
        });

        isFirstChunk = false;
        console.log(messages.value[messages.value.length - 1])
      } else {
        // Accumulate chunks in a single content update


        messages.value[messages.value.length - 1].content += decodedMessage.substring(0, decodedMessage.length - 1);
        console.log(accumulatedContent)
      }

      return reader.read().then(processText);
    });
  } catch (error) {
    console.error("Error in generation:", error);
    notificationStore.showNotification("Произошла ошибка при генерации сообщения", "error");
    gen.value = false;
  }
}


async function clear() {
  const result = await chat_api.chat_clear(route.params.id)

  if (result.status === 200) {
    messages.value = [];
  }

}


onMounted(async () => {
  const res = await loadMessages()

  if (res !== 200) {
    notificationStore.showNotification("Произошла ошибка", "error");
    await router.push('/knowledge_base');
  }

  loading.value = false;
  console.log(messages.value)
})

onUpdated(async () => {
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

              <!--              <span-->
              <!--                class="text-surface-700 dark:text-surface-100 inline-block font-medium border border-surface-200 dark:border-surface-700 p-4 whitespace-normal rounded"-->
              <!--                style="word-break: break-word; max-width: 80%">{{-->
              <!--                  message.metadata-->
              <!--                }}-->
              <!--              </span>-->

              <AssistantMessage
                v-if="message.role==='assistant'"
                :message="message.content"
                :sources=message.metadata.source
                :metadata="message.metadata"
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
              :disabled="gen"
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
                  class="bg-transparent"
                  icon="mdi-dots-horizontal"
                  density="compact"
                  elevation="0"
                >
                  <v-icon icon="mdi-cog-outline"></v-icon>
                  <v-menu
                    activator="parent"
                    location="top end"
                    transition="fade-transition"
                    :close-on-content-click="false"
                  >
                    <v-container>
                      <v-card class="px-4 py-4">
                        <template #text>

                          <!--                          <SwitchComponent-->
                          <!--                            name="Stream"-->
                          <!--                            :model-value="stream"-->
                          <!--                            @click="streamSwitch"-->
                          <!--                          />-->

                          <SwitchComponent
                            name="Использовать RAG"
                            :model-value="useRag"
                            @click="useRagSwitch"
                          />

                          <SwitchComponent
                            name="Использовать извлечение ключевых слов"
                            :model-value="extractKeywords"
                            @click="extractKeywordsSwitch"
                          />

                        </template>

                        <template #actions>
                          <v-col cols="12">
                            <v-btn
                              color="red"
                              text="Очистить чат"
                              class="float-end"
                              variant="elevated"
                              @click="clear"
                            />
                          </v-col>

                        </template>

                      </v-card>
                    </v-container>
                  </v-menu>
                </v-btn>


              </template>
              <template #append>
                <v-btn
                  color="primary"
                  text="Отправить"
                  :disabled="!newMessage.trim() || gen"
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
