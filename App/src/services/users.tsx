import axios from "axios";

export async function fetchData() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
}

export async function getUserPost(id: number) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );
  return response;
}
export async function updatePost(data: object, id: number) {
  const response = await axios.put(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    data
  );
  return response
}
export async function deletePost(id: number) {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
}
