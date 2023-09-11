import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost as deletePostAPI } from "./apiPosts";

export function useDeletePost() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deletePost } = useMutation({
    mutationFn: deletePostAPI,
    onSuccess: () => {
      console.log("post deleted succesfully");
      queryClient.invalidateQueries({ queryKey: ["Posts"] });
    },
    onError: console.log("Cannot delete post"),
  });

  return { isDeleting, deletePost };
}
