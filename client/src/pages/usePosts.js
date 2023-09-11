import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./apiPosts";

export function usePosts() {
  const { isLoading, data: Posts } = useQuery({
    queryKey: ["Posts"],
    queryFn: getPosts,
  });

  return { isLoading, Posts };
}
