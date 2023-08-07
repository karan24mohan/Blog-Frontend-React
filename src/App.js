import "./App.css";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blogs from "./Components/Blogs";
import UserProfile from "./Components/UserProfile";
import PrivateComponent from "./Components/PrivateComponent";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ShowNavBar from "./Components/ShowNavBar/ShowNavBar";
import UpdateBlog from "./Components/UpdateBlog";
import SingleBlog from "./Components/SingleBlog";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ShowNavBar>
          <Nav />
        </ShowNavBar>{" "}
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Home />} />{" "}
            <Route path="/blogs" element={<Blogs />} />{" "}
            <Route path="/getSingleBlog/:id" element={<UpdateBlog />} />{" "}
            <Route path="/SingleBlog/:id" element={<SingleBlog />} />{" "}
            <Route path="/userProfile" element={<UserProfile />} />{" "}
          </Route>{" "}
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/signup" element={<Signup />} />{" "}
        </Routes>{" "}
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
