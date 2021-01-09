const baseUrl = 'https://api.github.com';

export default {
  get: async function (endpoint: string) {
    let fullUrl = `${baseUrl}/${endpoint}`;

    if (endpoint.includes('http')) {
      fullUrl = endpoint;
    }

    const response = await fetch(fullUrl);

    const parsedResponse = await response.json();

    if (!response.ok) {
      throw Error(parsedResponse.message || 'An error occured');
    }

    return parsedResponse;
  },
};
