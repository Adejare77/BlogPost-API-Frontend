import { useEffect, useState } from "react";
import type { Post } from "../../types/post";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../api/posts";
import { AxiosError } from "axios";
import type { PaginationResponse } from "../../types/pagination";
import { Heart } from "lucide-react";
import { deleteLikedPost, likePost } from "../../api/like";
import toast from "react-hot-toast";
import getAPIErrorMessage from "../../utils/error";

const Posts = () => {
  const [pagination, setPagination] = useState<PaginationResponse<Post> | null>(
    null
  );
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [likeCount, setLikedCount] = useState<number>();

  const navigate = useNavigate();

  const handleLikePost = async (postId: string) => {
    await likePost(postId);
    toast.success("Post Liked 👍");
  };

  const handleDeleteLikedPost = async (postId: string) => {
    await deleteLikedPost(postId);
    toast.success("Like deleted 👎");
  };

  const toggleLike = async (post: Post) => {
    try {
      if (post.liked) {
        await handleDeleteLikedPost(post.id);
      } else {
        await handleLikePost(post.id);
      }

      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id
            ? {
                ...p,
                liked: !post.liked,
                likes: post.liked ? p.likes - 1 : p.likes + 1,
              }
            : p
        )
      );
    } catch (err: unknown) {
      err instanceof AxiosError && err.response?.status === 401
        ? toast.error("Login required")
        : getAPIErrorMessage(err);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts(page);
        setPagination(res.data);
        setPosts(res.data.results);

        window.scrollTo(0, 0);
      } catch (err: unknown) {
        if (err instanceof AxiosError) setErr("Failed to load Posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  if (loading) return <p>Loading...</p>;
  if (err) return <p>{err}</p>;
  if (!posts.length) return <h2>No posts yet</h2>;

  const first = posts[0];
  console.log(first.title, first.liked);

  return (
    <div className="posts-container">
      <div className="posts-grid">
        {posts.map((post) => (
          <article
            className="post-card"
            key={post.id}
            role="button"
            tabIndex={0}
          >
            <div className="post-card-header">
              <div className="author-avatar" aria-hidden="true">
                {post.author.fullName?.charAt(0).toUpperCase()}
              </div>

              <span className="post-date">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h2 className="post-title" onClick={() => navigate(post.id)}>
              {post.title}
            </h2>

            <p className="post-excerpt">{post.excerpt}</p>

            <div className="post-meta">
              <span className="meta-item">
                <svg
                  className="icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6 v6 l4 3" />
                </svg>
                <span>{post.commentCount}</span>
              </span>

              <span className="meta-item">
                <button onClick={() => toggleLike(post)}>
                  <Heart className={post.liked ? "liked" : "unlike"} />
                </button>
                <span>{post.likes}</span>
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="pagination">
        <button
          disabled={!pagination?.previous}
          onClick={() => setPage((p) => p - 1)}
          className="btn btn-secondary"
          aria-label="Go to previous page"
        >
          ⬅ Previous
        </button>

        <button
          disabled={!pagination?.next}
          className="btn btn-secondary"
          onClick={() => setPage((p) => p + 1)}
          aria-label="Go to next page"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Posts;
