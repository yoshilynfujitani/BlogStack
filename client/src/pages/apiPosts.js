import axios from "axios";

export async function getPosts({ page, category }) {
  let data;

  try {
    const res = await axios.get(
      `http://localhost:5175/api/posts?page=${page}${
        category ? `&category=${category}` : ""
      }`
    );
    data = res.data;
  } catch (err) {
    console.log(err.response.data);
  }

  return data;
}

export async function getPost(id) {
  let data;
  try {
    const res = await axios.get(`http://localhost:5175/api/posts/${id}`);
    data = res.data;
  } catch (err) {
    console.log(err);
  }

  return data;
}

export async function deletePost(id) {
  try {
    await axios.delete(`http://localhost:5175/api/posts/${id}`, {
      withCredentials: true,
    });
  } catch (err) {
    console.log(err);
  }
}
