export default (url, method, body) => {
  const baseUrl = 'https://jsonplaceholder.typicode.com/';
  return fetch(baseUrl + url, {
    method,
    body: JSON.stringify(body),
  }).then(response => response.json());
};
