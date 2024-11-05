<script setup>
import {onMounted} from 'vue';

import {KnowledgeBaseStore} from "@/stores/knowledge_base_store";
import {ChatStore} from "@/stores/chat_store";
import {NotificationStore} from "@/stores/notification_store";

const knowledgeBaseStore = KnowledgeBaseStore();
const chatStore = ChatStore();
const notificationStore = NotificationStore();

onMounted(async () => {
  await knowledgeBaseStore.getKBS()
  await chatStore.getChatList()
})

</script>

<template>
  <router-view/>
  <v-alert
    class="position-absolute"
    v-if="notificationStore.isVisible"
    :type="notificationStore.type"
    style="top: 20px; left: 50%; transform: translateX(-50%);"
    density="compact"
    theme="dark"
  >
    {{ notificationStore.message }}
  </v-alert>

</template>

<style scoped>
.position-absolute {
  position: absolute;
  z-index: 2000; /* Убедитесь, что z-index выше, чем у модальных окон */
}
</style>
