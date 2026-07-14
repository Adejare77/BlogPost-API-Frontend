export interface CreateCommentInput {
  content: string;
}

export interface Comment {
  id: string;
  author: {
    id: string;
    fullName: string;
  };
  content?: string;
  excerpt?: string;
  createdAt: string;
  likes: number;
  liked: Boolean;
}

export interface UpdateComment {
  id: string;
  author: {
    id: string;
    fullName: string;
  };
  content: string;
}
