import axios from "axios";

export async function getPosts() {
  let data;

  try {
    const res = await axios.get(`http://localhost:5175/api/posts`);
    data = res.data;
  } catch (err) {
    console.log(err.response.data);
  }

  return data;

  // }
  // console.log(data);
  // const filteredData = data.filter((post) => post.category === category);

  // return filteredData;
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
