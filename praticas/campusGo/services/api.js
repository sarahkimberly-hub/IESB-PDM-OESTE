function buildUrl(path) {
  const base = process.env.EXPO_PUBLIC_API_URL;
  if (!base) throw new Error('EXPO_PUBLIC_API_URL não definida. Copie .env.example para .env.');
  return `${base}/${path}`;
}

async function request(path, options) {
  const response = await fetch(buildUrl(path), options);
  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao acessar o servidor`);
  }
  return response.json();
}

export const api = {
  get: (path) => request(path),
  create: (resource, data) =>
    request(resource, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
    }),
};
