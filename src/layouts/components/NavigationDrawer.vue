<script setup>
import ChatConfigurationDialog from "@/components/chat_configuration/ChatConfigurationDialog.vue";
import {ChatStore} from "@/stores/chat_store";

const emit = defineEmits(['update:drawer', 'select']);
const chatStore = ChatStore()

defineProps(['drawer']);

</script>

<template>
  <v-navigation-drawer
    class="bg-gray_1"
    :model-value="drawer"
    @update:model-value="emit('update:drawer', $event)"
  >
    <v-list-item class="pt-2">
      <v-row align="start" justify="space-evenly">
        <v-col>
          <v-btn class="bg-gray_1" @click="emit('update:drawer', !drawer)" density="default" icon="mdi-menu"
                 elevation="0"/>
        </v-col>
        <v-col>
          <ChatConfigurationDialog
            tooltip-text="Создать чат"
            button-class="bg-gray_1 float-end"
          />
        </v-col>
      </v-row>

    </v-list-item>
    <v-divider/>

    <v-list class="mx-4 my-8">
      <v-list-item
        rounded
        value="99999"
        @click="$router.push({ name: 'KnowledgeBase' })"
      >
        <template #title>
          <div>
            <v-icon
              class="px-0 mx-0"
              icon="mdi-database-outline"
            />
            <span class="ml-2">
            Обзор
          </span>

          </div>

        </template>
      </v-list-item>

      <v-list-subheader>
        <span class="font-weight-black">
          Список чатов
        </span>
      </v-list-subheader>


      <v-list-item
        v-if="chatStore.chat_list"
        v-for="chat in chatStore.chat_list"
        :value="chat"
        :title="chat.name"
        class="list-item"
        value="s"
        @click="$router.push({ name: 'Chat', params: { id: chat.id } })"
      >
        <template #append>
          <ChatConfigurationDialog
            tooltip-text="Конфигурация"
            button-class="bg-transparent"
            button-density="compact"
            button-icon="mdi-dots-horizontal"
            type="update"
            :chat="chat"
          />
        </template>

      </v-list-item>

    </v-list>

  </v-navigation-drawer>
</template>

<style scoped lang="scss">
</style>
