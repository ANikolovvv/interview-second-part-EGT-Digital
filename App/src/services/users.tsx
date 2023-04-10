import axios from "axios";

export async function fetchData() {
  let users = [];
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    users = response.data;
  } catch (error) {
    console.log(error);
  }
  return users;
}

export async function getUserPost(id: any) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?userId=${id}`
  );
  return response;
}
export async function updatePost(data: any, id: number) {
  try {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
export async function deletePost(id: number) {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
}
