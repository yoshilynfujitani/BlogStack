import { useQuery } from "@tanstack/react-query";
import { getPosts } from "./apiPosts";
import { useSearchParams } from "react-router-dom";

export function usePosts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category")
    ? searchParams.get("category")
    : null;

  const currentPage = searchParams.get("page") ? searchParams.get("page") : 1;

  const { isLoading, data: { data: Posts, totalCount } = {} } = useQuery({
    queryKey: ["Posts", currentPage, category],
    queryFn: () => getPosts({ page: currentPage, category }),
  });

  return { isLoading, Posts, totalCount };
}
