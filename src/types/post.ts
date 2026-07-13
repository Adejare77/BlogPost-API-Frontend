interface Base {
  id: string;
  author: {
    id: string;
    fullName: string;
  };
  title: string;
  content?: string;
  createdAt: string;
}

export type Status = "all" | "draft" | "published";

export interface Post extends Base {
  excerpt?: string;
  likes: number;
  liked: boolean;
  commentCount: number;
  isPublished: boolean;
}

export interface CreatePostInput {
  title: string;
  content: string;
  isPublished: boolean;
}

export interface UpdatePostInput {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
}

export interface CreatePostResponse extends Base {}
