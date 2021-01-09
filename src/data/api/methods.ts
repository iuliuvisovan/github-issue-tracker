const baseUrl = 'https://api.github.com';

export default {
  get: async function (endpoint: string) {
    const options = { method: 'GET' };

    let fullUrl = `${baseUrl}/${endpoint}`;

    if (endpoint.includes('http')) {
      fullUrl = endpoint;
    }

    const response = await fetch(fullUrl, options);

    const json = await response.json();

    if (!response.ok) {
      throw Error(json.message || 'An error occured');
    }

    return json;
  },
};
