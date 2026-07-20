import { createRoot } from "react-dom/client";
import { router } from "./routes/index.tsx";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import "./styles/global.css";
import "./components/layouts/AppLayout.css";
import "./pages/Posts/Posts.css";
import "./pages/PostDetail/PostDetail.css";
import "./pages/Login/LoginForm.css";
import "./pages/CreatePosts/CreatePost.css";
import "./components/Footer/Footer.css";
import "./pages/Register/Register.css";
import "./pages/UserPosts/UserPosts.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
