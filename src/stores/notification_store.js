// stores/notificationStore.js
import {defineStore} from "pinia";

export const NotificationStore = defineStore('notification_store', {
  state: () => ({
    message: '',
    type: 'success',
    isVisible: false,
  }),
  actions: {
    showNotification(message, type = 'success') {
      this.message = message;
      this.type = type;
      this.isVisible = true;

      // Автоматическое скрытие уведомления через 3 секунды
      setTimeout(() => {
        this.isVisible = false;
        this.message = '';
      }, 3000);
    }
  },
});
