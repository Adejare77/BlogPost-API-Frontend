import instance from "../lib/axios";
import { type Like } from "../types/like";

const likePost = (postId: string) =>
  instance.post<Like>(`posts/${postId}/likes/`);

const deleteLikedPost = (postId: string) =>
  instance.delete<Like>(`posts/${postId}/likes/`);

const likeComment = (commentId: string) =>
  instance.post<Like>(`comments/${commentId}/likes`);

const deleteLikedComment = (commentId: string) =>
  instance.delete<Like>(`comments/${commentId}/likes`);

export { likePost, deleteLikedPost, likeComment, deleteLikedComment };
