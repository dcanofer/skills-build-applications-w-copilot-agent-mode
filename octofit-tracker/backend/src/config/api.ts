const codespaceName = process.env.CODESPACE_NAME;

export const getApiBaseUrl = (): string => {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

export const getApiConfig = () => ({
  baseUrl: getApiBaseUrl(),
  port: 8000,
});
