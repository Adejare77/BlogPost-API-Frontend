import instance from "../lib/axios";
import type { PaginationResponse } from "../types/pagination";
import type {
  CreatePostInput,
  CreatePostResponse,
  Post,
  UpdatePostInput,
} from "../types/post";

export const getPosts = (page: number) =>
  instance.get<PaginationResponse<Post>>(`/posts/?page=${page}`);

export const getPost = (id: string) => instance.get<Post>(`/posts/${id}/`);

export const createPost = (data: CreatePostInput) =>
  instance.post<CreatePostResponse>("/posts/", data);

export const getMyPosts = (status: string, page: number) =>
  instance.get<PaginationResponse<Post>>(
    `/posts/?status=${status}&author=me&page=${page}`
  );

export const deletePost = (id: string) =>
  instance.delete<void>(`/posts/${id}/`);

export const updatePost = (id: string, data: UpdatePostInput) =>
  instance.patch<Post>(`/posts/${id}/`, data);
