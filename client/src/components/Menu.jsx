import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePosts } from "../pages/usePosts";
import Spinner from "./Spinner";

const Menu = ({ category }) => {
  const { Posts: posts, isLoading } = usePosts();
  if (isLoading) return <Spinner />;
  return (
    <div className="p-5 md:px-24">
      <h1 className="text-md font-semibold py-4">Other posts you may like</h1>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
        {posts.map((post) => (
          <div className="flex space-x-2 md:block" key={post.id}>
            <img
              src={`/upload/${post.img}`}
              alt=""
              className="rounded-md h-24 md:h-48 w-auto"
            />
            <div className="">
              <h2 className="py-1 text-lg font-semibold">{post.title}</h2>
              <Link className="link" to={`/post/${post.id}`}>
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-2 py-1 rounded-md">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
