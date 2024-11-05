import {defaultApiInstance} from "@/api";

export const document_api = {
  get_document_list(kbID) {
    const url = '/api/v1/doc/list'

    return defaultApiInstance.get(url, {params: {kb_id: kbID}})
  },

  upload_document(kbID, files) {
    const url = '/api/v1/doc/upload';

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    return defaultApiInstance.post(url, formData, {
      params: {kb_id: kbID},
      headers: {'Content-Type': 'multipart/form-data'}
    });
  },

  delete_document(kbID, docID) {
    const url = '/api/v1/doc/delete'
    return defaultApiInstance.delete(url, {params: {kb_id: kbID, doc_id: docID}})

  },

  create_chunks(kbID, docID) {
    const url = '/api/v1/doc/create_chunks?kb_id=' + kbID + '&doc_id=' + docID;
    return defaultApiInstance.post(url);
  }

}
