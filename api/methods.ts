const baseUrl = 'https://api.github.com';

export default {
  get: async function (endpoint: string) {
    const options = { method: 'GET' };

    const response = await fetch(`${baseUrl}/${endpoint}`, options);

    console.log('Fetching', `${baseUrl}/${endpoint}`);

    const json = await response.json();

    if (!response.ok) throw Error(json.message);

    return json;
  },
};
