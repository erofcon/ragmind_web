<script setup>
import CreateChatComponent from "@/components/chat_configuration/ChatConfiguration.vue";
import {shallowRef} from "vue";

const dialog = shallowRef(false)

defineProps({
  type: {
    type: String,
    default: "create",
  },
  chat: {
    type: Object,
    default: {}
  },
  tooltipText: {
    type: String,
    default: '',
  },
  buttonIcon: {
    type: String,
    default: 'mdi-square-edit-outline',
  },
  buttonDensity: {
    type: String,
    default: 'default',
  },
  buttonElevation: {
    type: Number,
    default: 0
  },
  buttonClass: {
    type: String,
    default: '',
  }
})

</script>

<template>
  <v-dialog
    v-model="dialog"
    max-width="800"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-tooltip
        open-delay="100"
        max-width="300"
        location="right"
        :text=tooltipText>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="activatorProps, props"
                 :class="buttonClass"
                 :density="buttonDensity"
                 :icon="buttonIcon"
                 :elevation="buttonElevation"/>
        </template>
      </v-tooltip>

    </template>

    <template v-slot:default="{ isActive }">
      <CreateChatComponent
        v-if="type==='update'"
        @close-dialog="dialog = false"
        :type="type"
        :name="chat.name"
        :kb_id="chat.kb_id"
        :chat_id="chat.id"
        :system_prompt="chat.prompt_engine.system"
        :system_rag_prompt="chat.prompt_engine.rag_system"
        :threshold="chat.prompt_engine.threshold"
        :topK="chat.prompt_engine.k"
        :useRerank="chat.prompt_engine.user_rerank"
        :temperatureValue="chat.m_settings.temperature"
        :topPValue="chat.m_settings.top_p"
        :presencePenaltyValue="chat.m_settings.presence_penalty"
        :frequencyPenaltyValue="chat.m_settings.frequency_penalty"
        :maxTokensValue="chat.m_settings.max_tokens"
      />
      <CreateChatComponent
        v-if="type==='create'"
        @close-dialog="dialog = false"
        :type="type"
      />
    </template>
  </v-dialog>
</template>

<style scoped lang="scss">

</style>
