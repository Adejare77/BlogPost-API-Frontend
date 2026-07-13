import { useEffect, useState } from "react";
import type { Post, Status } from "../../types/post";
import { deletePost, getMyPosts } from "../../api/posts";
import { Heart, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { type PaginationResponse } from "../../types/pagination";

const UserPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<PaginationResponse<Post> | null>(
    null
  );
  const [page, setPage] = useState<number>(1);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("published");

  const navigate = useNavigate();

  const confirmDelete = (id: string) => {
    setShowConfirmDialog(true);
    setDeleteId(id);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      await deletePost(deleteId);
      setPosts((prev) => prev.filter((post) => post.id !== deleteId));
      toast.success("Post deleted successfully");
    } catch (err) {
      toast.error("Failed to delete. Try again later");
    } finally {
      setDeleteId(null);
      setShowConfirmDialog(false);
      setIsDeleting(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmDialog(false);
    setDeleteId(null);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getMyPosts(status, page);
        console.log(res.data);
        setPosts(res.data.results);
        setPagination(res.data);
        setLoading(false);
        window.scrollTo(0, 0);
      } catch (err) {
        setErr("Failed to load Posts. Try again later");
      }
    };

    fetchPosts();
  }, [status, page]);

  if (loading) return <p>Loading...</p>;
  if (err) return <p>{err}</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-filter">
          <button
            className={
              status === "published" ? "btn-status active" : "btn-status"
            }
            onClick={() => {
              setStatus("published");
              setPage(1);
            }}
          >
            Published
          </button>
          <button
            className={status === "draft" ? "btn-status active" : "btn-status"}
            onClick={() => {
              setStatus("draft");
              setPage(1);
            }}
          >
            Draft
          </button>
          <button
            className={status === "all" ? "btn-status active" : "btn-status"}
            onClick={() => {
              setStatus("all");
              setPage(1);
            }}
          >
            All
          </button>
        </div>
      </div>

      {posts.length === 0 ? (
        <p>You have not created any post yet.</p>
      ) : (
        <div className="dashboard-post-container">
          <div className="dashboard-post-header">
            <span>Title</span>
            <span>Date</span>
            <span>Status</span>
            <span>Edit</span>
            <span>Delete</span>
          </div>
          <div className="dashboard-posts-list">
            {posts.map((post) => (
              <article key={post.id} className="dashboard-post-row">
                <div className="dashboard-post-title">
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                  <div className="dashboard-post-meta">
                    <div className="dashboard-meta-item">
                      <span className="dashboard-post-meta-icon">
                        <svg
                          className="icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <Heart size={24} />
                        </svg>
                      </span>
                      <span className="dashboard-post-meta-value">
                        {post.likes}
                      </span>
                    </div>
                    <div className="dashboard-meta-item">
                      <span className="dashboard-post-meta-icon">
                        <svg
                          className="icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6 v6 l4 2" />
                        </svg>
                      </span>
                      <span className="dashboard-post-meta-value">
                        {post.commentCount}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="dashboard-post-date">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className="dashboard-post-status">
                  <svg
                    className={`icon status-icon ${
                      post.isPublished ? "published" : "draft"
                    }`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {post.isPublished ? (
                      <circle cx="12" cy="12" r="10" />
                    ) : (
                      <path d="M12 1 l11 11 l-11 11 l-11 -11 l11 -11" />
                    )}
                  </svg>
                </span>
                <button>
                  <Pencil
                    size={18}
                    className="dashboard-action"
                    onClick={() => navigate(`edit-post/${post.id}`)}
                  />
                </button>
                <button>
                  <Trash2
                    size={18}
                    className="dashboard-action"
                    onClick={() => confirmDelete(post.id)}
                  />
                </button>
              </article>
            ))}
          </div>
        </div>
      )}

      <div className="pagination">
        <button
          disabled={!pagination?.previous}
          className="btn btn-secondary"
          onClick={() => setPage((p) => p - 1)}
        >
          ⬅ Previous
        </button>
        <button
          disabled={!pagination?.next}
          className="btn btn-secondary"
          onClick={() => setPage((p) => p + 1)}
        >
          Next ➡
        </button>
      </div>

      {showConfirmDialog && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="modal-action">
              <button
                onClick={cancelDelete}
                disabled={isDeleting}
                className="modal-action-btn"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="modal-action-btn btn-danger"
              >
                {isDeleting ? "Deleting.." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPosts;
