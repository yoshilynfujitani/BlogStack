import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./apiPosts";
import { useSearchParams } from "react-router-dom";

export function usePosts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const { isLoading, data: Posts } = useQuery({
    queryKey: ["Posts", currentPage],
    queryFn: () => getPosts(currentPage),
  });

  return { isLoading, Posts };
}
