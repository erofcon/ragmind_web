import {defineStore} from "pinia";
import {knowledge_base_api} from "@/api/routes/knowledge_base_api";
import {th} from "vuetify/locale";

export const KnowledgeBaseStore = defineStore('knowledge_base_store', {
  state: () => ({
    kbs: [],
  }), actions: {
    setKBS(value) {
      this.kbs = value
    }, async getKBS() {
      const result = await knowledge_base_api.get_knowledge_base_list();
      if (result.status === 200) {
        this.setKBS(result.data)
      }
    },

    async createKB(params) {

      try {
        const result = await knowledge_base_api.create_knowledge_base(params);

        if (result.status === 200) {
          this.kbs.push(result.data);
        }
        return result.status
      } catch (error) {
        return 400
      }

    },

    async deleteKB(kbID) {
      try {
        const result = await knowledge_base_api.delete_knowledge_base(kbID);

        if (result.status === 200) {
          this.kbs = this.kbs.filter(kb => kb.id !== kbID);
        }
        return result.status
      } catch (error) {
        return 400
      }
    }
  },
})
