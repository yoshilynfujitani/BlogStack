import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const category = useLocation().search;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5175/api/posts${category}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);
  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="" />
            </div>
            {console.log(post.img)}
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              {/* <p>{getText(post.desc)}</p> */}
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
