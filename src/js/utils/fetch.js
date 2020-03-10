export function get(url) {
  try {
    return fetch(url).then(response => response.json());
  } catch (error) {
    console.error('Could not fetch your request', error);
  }
}

export default {
  get
};
