const codespaceName = process.env.CODESPACE_NAME?.trim();
const localhostBaseUrl = 'http://localhost:8000';

export const getApiBaseUrl = (): string => {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return localhostBaseUrl;
};

export const getApiConfig = () => ({
  baseUrl: getApiBaseUrl(),
  port: 8000,
});
