import instance from "../lib/axios";
import type { PaginationResponse } from "../types/pagination";

const getComments = (postId: string) =>
  instance.get<PaginationResponse<Comment>>(`posts/${postId}/comments/`);

const createComment = (postId: string) =>
  instance.post<Comment>(`posts/${postId}/comments/`);

const getComment = (commentId: string) =>
  instance.get<Comment>(`comments/${commentId}/`);

const updateComment = (commentId: string) =>
  instance.patch<Comment>(`comments/${commentId}/`);

const deleteComment = (commentId: string) =>
  instance.delete<void>(`comments/${commentId}/`);

const getReplies = (commentId: string) =>
  instance.get<PaginationResponse<Comment>>(`comments/${commentId}/replies/`);

const createReply = (commentId: string) =>
  instance.post<Comment>(`comments/${commentId}/replies/`);

const getReply = (replyId: string) =>
  instance.get<Comment>(`replies/${replyId}/`);

const updateReply = (replyId: string) =>
  instance.patch<Comment>(`replies/${replyId}/`);

const deleteReply = (replyId: string) =>
  instance.delete<void>(`replies/${replyId}/`);

export {
  getComments,
  createComment,
  getComment,
  updateComment,
  deleteComment,
  getReplies,
  createReply,
  getReply,
  updateReply,
  deleteReply,
};
