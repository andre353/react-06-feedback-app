import { Navigate, useNavigate, Routes, Route } from "react-router-dom";

function Post() {
  const status = 200;

  const navigate = useNavigate();

  if (status === 404) {
    return <Navigate to="/notfound" />;
  }

  const onClick = () => {
    navigate("/about");
  };

  return (
    <div>
      <h1>Post</h1>
      <button className="nav-link" onClick={onClick}>
        About Page
      </button>
      <Routes>
        {/* to enable this route in app.js adding /* to <Route path="/post/*" element={<Post />} /> */}
        <Route path='/show' element={<h1>Hello World</h1>} />
      </Routes>
    </div>
  );
}

export default Post;
