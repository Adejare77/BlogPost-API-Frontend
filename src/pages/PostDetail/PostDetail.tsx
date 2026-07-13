import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Post } from "../../types/post";
import { getPost } from "../../api/posts";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setErr("Invalid Post");
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await getPost(id);
        setPost(res.data);
      } catch (err) {
        setErr("Not Found");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (err) return <p>{err}</p>;
  if (!post) return <h2>Post not found</h2>;

  return (
    <div className="post-detail-container">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-secondary post-back-btn"
        aria-label="Go back to previous page"
      >
        ⬅ Back
      </button>

      <article className="post-detail-card">
        <header className="post-detail-header">
          <div className="post-detail-meta">
            <div className="post-detail-author-avatar">
              {post?.author.fullName?.charAt(0).toUpperCase()}
            </div>
            <div className="author-info">
              <span className="author-name">{post?.author.fullName}</span>
              <span className="post-date">
                {new Date(post?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </header>

        <h1 className="post-detail-title">{post.title}</h1>

        <div className="post-detail-content">{post.content}</div>

        <footer className="post-detail-footer">
          <span className="meta-item">💬 {post.commentCount} Comments</span>
          <span className="meta-item">❤️ {post.likes} Likes</span>
        </footer>
      </article>
    </div>
  );
};

export default PostDetail;
