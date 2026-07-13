import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, getPost, updatePost } from "../../api/posts";
import { AxiosError } from "axios";
import getAPIErrorMessage from "../../utils/error";
import toast from "react-hot-toast";

const CreatePost = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [characters, setCharacters] = useState<number>(0);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isPublished, setIsPublished] = useState<"publish" | "draft">("draft");

  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const result = await getPost(id);
        setTitle(result.data.title);
        setContent(result.data.content ?? "");
        setCharacters(result.data.content?.length ?? 0);
      } catch (err: unknown) {
        err instanceof AxiosError && err.response?.status === 404
          ? setErr("Post Not Found")
          : getAPIErrorMessage(err);
      }
    };

    fetchPost();
  }, []);

  const confirmSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!id) return;

    setIsPublished(e.currentTarget.value as "publish" | "draft");
    setShowConfirmDialog(true);
  };

  const cancelSubmit = () => {
    setShowConfirmDialog(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      let res;
      if (id) {
        const data = {
          id,
          title,
          content,
          isPublished: isPublished === "publish",
        };
        res = await updatePost(id, data);
      } else {
        res = await createPost({
          title,
          content,
          isPublished: isPublished === "publish",
        });
      }
      toast.success(
        id ? "Post Updated Successfully" : "Post Created Successfully"
      );
      navigate(`/dashboard/posts/${res.data.id}`, { replace: true });
    } catch (err: any) {
      setErr(err.response?.data?.detail || "Failed to create post");
    } finally {
      setLoading(false);
      setShowConfirmDialog(false);
    }
  };

  return (
    <div className="create-post-container">
      <h2 className="create-post-title">{id ? "Update" : "Create"} Post</h2>

      {err && (
        <p className="error" role="alert">
          {err}
        </p>
      )}

      <div className="form-card">
        <form onSubmit={handleSubmit} className="form">
          <div className="create-form-field">
            <label htmlFor="title">Post Title</label>
            <input
              className="input"
              id="title"
              name="title"
              type="text"
              maxLength={100}
              placeholder="Enter your post title here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          <div className="create-form-field">
            <label htmlFor="content">Post Content</label>
            <textarea
              className="textarea"
              id="content"
              name="content"
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setCharacters(e.target.value.length);
              }}
              required
              aria-required="true"
            />
          </div>

          <div className="characters-count">{characters} characters</div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-primary"
              name="action"
              value="publish"
              disabled={loading}
              onClick={confirmSubmit}
              aria-label="Publish your post"
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              name="action"
              value="draft"
              disabled={loading}
              onClick={confirmSubmit}
              aria-label="Save as draft"
            >
              {loading ? "Saving..." : "Save Draft"}
            </button>

            <button
              className="btn btn-cancel"
              type="button"
              onClick={() => {
                setContent("");
                setTitle("");
                setCharacters(0);
              }}
              disabled={!title && !content}
              aria-label="Clear form"
            >
              Clear form
            </button>
          </div>
          {showConfirmDialog && (
            <div className="post-modal-overlay">
              <div className="post-modal-content">
                <h3>Confirm {id ? "Update" : "Create"} Post</h3>
                <div className="post-modal-action">
                  <button
                    type="button"
                    name="action"
                    value={isPublished}
                    onClick={cancelSubmit}
                    className="post-modal-action-btn danger"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="post-modal-action-btn">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
