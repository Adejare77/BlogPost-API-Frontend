import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "../components/layouts/AppLayout";
import Posts from "../pages/Posts/Posts";
import { ProtectedRoute } from "../components/ProtectedRoute";
import PostDetail from "../pages/PostDetail/PostDetail";
import UserPosts from "../pages/UserPosts/UserPosts";
import Login from "../pages/Login/Login";
import RegisterUser from "../pages/Register/Register";
import CreatePost from "../pages/CreatePosts/CreatePost";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <RegisterUser /> },
  { path: "/", element: <Navigate to="/posts" replace /> },

  {
    path: "/posts",
    element: <AppLayout />,
    children: [
      { index: true, element: <Posts /> },
      { path: ":id", element: <PostDetail /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <AppLayout />,
        children: [
          // { path: "posts", element: <UserPosts /> },
          { index: true, element: <UserPosts /> },
          { path: "posts/:id", element: <PostDetail /> },
          { path: "create-post", element: <CreatePost /> },
          { path: "edit-post/:id", element: <CreatePost /> },
        ],
      },
    ],
  },
]);

export { router };
