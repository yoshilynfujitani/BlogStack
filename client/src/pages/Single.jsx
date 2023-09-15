import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import moment from "moment";
import Menu from "../components/Menu";
import { getPost } from "./apiPosts";
import { usePost } from "./usePost";
import Spinner from "../components/Spinner";
import { useDeletePost } from "./useDeletePost";

const Single = () => {
  const navigate = useNavigate();

  // const postId = location.pathname.split("/")[2];
  const { id } = useParams();

  const { currentUser } = useContext(AuthContext);

  const { isLoading, post } = usePost();
  const { isDeleting, deletePost } = useDeletePost();
  if (isLoading) return <Spinner />;
  console.log(post);

  const handledelete = (id) => {
    deletePost(id);
    navigate("/");
  };
  const value = post.desc;

  return (
    <div className="container">
      <div className="">
        <img
          src={`/upload/${post.img}`}
          alt=""
          className="md:max-h-[500px] md:rounded-lg  bg-cover md:px-24 "
        />
        <div className="p-5 md:px-24">
          {post.userImg && <img src={post.userImg} alt="" />}
          <h1 className="text-2xl font-bold md:text-4xl">{post.title}</h1>
          <div className="info">
            <h1 className="text-gray-400 font-semibold text-lg md:text-xl">
              Written by{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-transparent bg-clip-text">
                {post.username}
              </span>
            </h1>
            <p className="italic text-sm">
              Posted {moment(post.date).fromNow()}
            </p>
          </div>
          {currentUser?.username === post.username && (
            <div className="space-x-2 my-2">
              <Link to={`/write?edit=2`} state={post}>
                <button className="bg-yellow-400 px-2 py-1 text-white rounded-md font-semibold ">
                  Edit
                </button>
              </Link>
              <button
                className="bg-red-400 px-2 py-1 text-white rounded-md font-semibold "
                onClick={() => handledelete(post.id)}
                disabled={isDeleting}
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div
          className="px-5 md:px-24"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
      <Menu category={post.category} />
    </div>
  );
};

export default Single;
