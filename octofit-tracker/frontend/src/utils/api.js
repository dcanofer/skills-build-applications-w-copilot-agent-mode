const rawCodespaceName = import.meta.env?.VITE_CODESPACE_NAME?.trim?.() ?? '';

export const getApiBaseUrl = () => {
  if (rawCodespaceName) {
    return `https://${rawCodespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
};

export const getApiUrl = (component) => `${getApiBaseUrl()}/${component}/`;

export const normalizeApiResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  return (
    payload.results ??
    payload.items ??
    payload.data ??
    payload.docs ??
    payload.content ??
    []
  );
};
