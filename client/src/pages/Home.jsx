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
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`./upload/${post.img}`} alt="" />
            </div>

            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              {/* <p>{getText(post.desc)}</p> */}
              <div dangerouslySetInnerHTML={{ __html: post.desc }} />
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
