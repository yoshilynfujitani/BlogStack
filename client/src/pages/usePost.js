import { useQuery } from "@tanstack/react-query";
import { getPost } from "./apiPosts";
import { useParams } from "react-router-dom";

export function usePost() {
  const { id } = useParams();
  const { isLoading, data: post } = useQuery({
    queryKey: ["Post"],
    queryFn: () => getPost(id),
  });

  return { isLoading, post };
}
