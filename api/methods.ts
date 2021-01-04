const baseUrl = 'https://api.github.com/repos/';

export default {
  get: async function (endpoint: string) {
    const options = { method: 'GET' };

    const response = await fetch(`${baseUrl}/${endpoint}`, options);
    const json = await response.json();

    if (!response.ok) throw Error(json.message);

    return json;
  },
};
