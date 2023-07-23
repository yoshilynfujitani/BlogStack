import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import moment from "moment";

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5175/api/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handledelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5175/api/posts/${postId}`)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  console.log(post)

  return (<div className="single">
    <div className="content">
      <img src={post?.img} alt="" />
      <div className="user">
        {post.userImg && <img
          src={post.userImg}
          alt=""
        />}
        <div className="info">
          <span>{post.username}</span>
          <p>Posted {moment(post.date).fromNow()}</p>
        </div>
        {currentUser.username === post.username && (

          <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
              <button>Edit</button>
            </Link>
            <button onClick={handledelete}>Delete</button>
          </div>
        )}
      </div>
      <h1>{post.title}</h1>
      {post.desc}
      {/* <p
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.desc),
        }}
      ></p>     */}
    </div>
    {/* <Menu cat={post.cat} /> */}
  </div>);
};

export default Single;
