import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./contexts/User";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import ArticlesListByUser from "./components/UsersList";
import TopicsList from "./components/TopicsList";
import ArticleListByTopic from "./components/ArticleListByTopic";
import ArticleList from "./components/ArticleList";
import UserChange from "./components/UserChange";
import ArticleCard from "./components/ArticleCard";

import "./App.css";

function App() {
  const [user, setUser] = useState({
    username: "grumpy19",
    name: "Paul Grump",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  });
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/topics" element={<TopicsList />}></Route>
            <Route
              path="/topics/:topic"
              element={<ArticleListByTopic />}
            ></Route>
            <Route path="/users" element={<ArticlesListByUser />}></Route>
            <Route path="/users/user_change" element={<UserChange />}></Route>
            <Route path="/articles" element={<ArticleList />}></Route>
            <Route
              path="/api/articles/:article_id"
              element={<ArticleCard />}
            ></Route>
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
