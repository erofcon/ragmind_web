import axios from 'axios';

const defaultUrl = 'http://127.0.0.1:8000';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Authorization': '',
}

export const defaultApiInstance = axios.create({
  baseURL: defaultUrl,
  headers: defaultHeaders,
});
