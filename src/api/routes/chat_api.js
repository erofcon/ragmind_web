import {defaultApiInstance} from "@/api";


export const chat_api = {
  get_chat_list() {
    const url = '/api/v1/chat/list';

    return defaultApiInstance.get(url)
  },

  create_chat(body) {
    const url = '/api/v1/chat/create';

    return defaultApiInstance.post(url, body);
  },

  update_chat(chatID, body) {
    const url = '/api/v1/chat/update';

    return defaultApiInstance.put(url, body, {params: {chat_id: chatID}});
  },

  delete_chat(chatID) {
    const url = '/api/v1/chat/delete';

    return defaultApiInstance.delete(url, {params: {chat_id: chatID}})
  },

  get_chat_messages(chatID) {
    const url = '/api/v1/chat/message/list';

    return defaultApiInstance.get(url, {params: {chat_id: chatID}})
  },

  generation_message(chatID, body, useRag, extractKeywords, stream = false) {
    const url = '/api/v1/chat/generation';

    return defaultApiInstance.post(url, body, {
      params: {
        chat_id: chatID,
        use_rag: useRag,
        extract_keywords: extractKeywords,
        stream: stream
      }
    });
  }

}
