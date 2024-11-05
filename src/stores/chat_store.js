import {defineStore} from "pinia";
import {chat_api} from "@/api/routes/chat_api";

export const ChatStore = defineStore("chat", {
  state: () => ({
    chat_list: [],
  }),
  actions: {
    setChatList(value) {
      this.chat_list = value
    },
    async getChatList() {
      const result = await chat_api.get_chat_list();

      if (result.status === 200) {
        this.setChatList(result.data);
      }
    },

    async createChat(params) {
      try {
        const result = await chat_api.create_chat(params);

        if (result.status === 200) {
          this.chat_list.push(result.data);
        }

        return result.status

      } catch (error) {
        return 400
      }
    },
    async updateChat(chatID, params) {
      try {
        const result = await chat_api.update_chat(chatID, params);

        if (result.status === 200) {
          const index = this.chat_list.findIndex(chat => chat.id === chatID);
          if (index !== -1) {
            this.chat_list[index] = {
              ...this.chat_list[index],
              ...result.data,
              m_settings: {
                ...this.chat_list[index].m_settings,
                ...result.data.m_settings,
              },
              prompt_engine: {
                ...this.chat_list[index].prompt_engine,
                ...result.data.prompt_engine,
              },
            };
          }

        }

        return result.status

      } catch (error) {
        return 400
      }
    },

    async deleteChat(chatID) {
      try {
        const result = await chat_api.delete_chat(chatID);
        if (result.status === 200) {
          this.chat_list = this.chat_list.filter(chat => chat.id !== chatID);
        }

        return result.status

      } catch (e) {
        return 400
      }
    }
  }
})
