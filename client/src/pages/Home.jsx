import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const cat = useLocation().search;

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`http://localhost:5175/api/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, [cat]);

  return (
    <div className="container">
      <div className="max-w-screen">
        {posts.map((post) => (
          <div className="flex flex-col md:flex-row" key={post.id}>
            <div className="w-96 min-h-[100px] max-h-[500px]">
              <img src={`./upload/${post.img}`} alt="" />
            </div>

            <div className="content">
              <h1>{post.title}</h1>

              {/* <p>{getText(post.desc)}</p> */}
              <div
                className="max-w-[200px] truncate "
                dangerouslySetInnerHTML={{ __html: post.desc }}
              />

              <Link className="link" to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
