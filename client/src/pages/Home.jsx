import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { usePosts } from "./usePosts";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isLoading, Posts } = usePosts();

  if (isLoading) return <Spinner />;

  const filterValue = searchParams.get("category") || "all";
  let filteredPost;

  if (filterValue === "all") {
    filteredPost = Posts;
  }
  if (filterValue === "art") {
    filteredPost = Posts.filter((post) => post.category === filterValue);
  }
  if (filterValue === "science") {
    filteredPost = Posts.filter((post) => post.category === filterValue);
  }
  if (filterValue === "technology") {
    filteredPost = Posts.filter((post) => post.category === filterValue);
  }
  if (filterValue === "cinema") {
    filteredPost = Posts.filter((post) => post.category === filterValue);
  }
  if (filterValue === "design") {
    filteredPost = Posts.filter((post) => post.category === filterValue);
  }
  if (filterValue === "food") {
    filteredPost = Posts.filter((post) => post.category === filterValue);
  }

  return (
    <div className="container">
      <div className="max-w-screen px-5">
        <h1 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent text-2xl font-bold">
          Latest blogs around the world
        </h1>
        {filteredPost.map((post) => (
          <div className="flex flex-col gap-5 my-5 md:flex-row" key={post.id}>
            <div className="max-w-[600px]">
              <img src={`./upload/${post.img}`} alt="" className="rounded-sm" />
            </div>

            <div className="content">
              <h1 className="font-semibold text-xl py-2">{post.title}</h1>

              {/* <p>{getText(post.desc)}</p> */}
              <h1
                className="line-clamp-3 md:line-clamp-6 text-gray-700 "
                dangerouslySetInnerHTML={{ __html: post.desc }}
              />

              <Link className="link" to={`/post/${post.id}`}>
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-2 py-1 rounded-md my-2">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
