import {defaultApiInstance} from "@/api";

export const knowledge_base_api = {
  get_knowledge_base_list() {
    const url = '/api/v1/kb/list'

    return defaultApiInstance.get(url);
  },
  create_knowledge_base(params) {
    const url = '/api/v1/kb/create'

    return defaultApiInstance.post(url, params);
  },

  delete_knowledge_base(kbID) {
    const url = '/api/v1/kb/delete'

    return defaultApiInstance.delete(url, {params: {kb_id: kbID}});
  },
}
