import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import Card from "./components/shared/Card";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";
import Post from "./components/Post";
import {FeedbackProvider} from './context/FeedbackContext'; // in curly braces as there is no default by export from FeedbackContext.js

function App() {
  
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Card>
                      <NavLink to='/' className="nav-link">Home</NavLink>
                      <NavLink to='/about' className="nav-link">About</NavLink>
                      <NavLink to='/post' className="nav-link">Post</NavLink>
                  </Card>
                  <FeedbackForm />
                  <FeedbackStats />
                  <FeedbackList  />
                  <AboutIconLink />
                </>
              }
            ></Route>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/post/*" element={<Post />} />
          </Routes>
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
