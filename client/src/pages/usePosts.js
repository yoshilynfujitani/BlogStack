import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./apiPosts";
import { useSearchParams } from "react-router-dom";

export function usePosts() {
  const { isLoading, data: Posts } = useQuery({
    queryKey: ["Posts"],
    queryFn: getPosts,
  });

  return { isLoading, Posts };
}
