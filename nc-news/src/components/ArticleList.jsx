import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import * as api from "../api";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [disableDESC, setDisableDESC] = useState(true);
  const [disableASC, setDisableASC] = useState(false);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("created_at");
  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    api.getArticles(page, topic, limit, order, search).then((articlesAPI) => {
      if (articlesAPI.length === 0 && topic === undefined) {
        setArticles("No Articles Found!");
        setIsLoading(false);
      } else if (articlesAPI.length === 0 && topic !== undefined) {
        setArticles(`No articles found for ${topic} topic!`);
        setIsLoading(false);
      } else {
        setArticles(articlesAPI);
        setIsLoading(false);
      }
    });
  }, [page, topic, order, search, limit]);

  let h2 = <h2>Articles :</h2>;

  if (topic !== undefined) {
    h2 = <h2>{topic} articles :</h2>;
  }

  return (
    <section>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="sectionListOfArticles">
          {h2}
          <div>
            <label>Sort by: </label>
            <select
              className="Select"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              name="sort_by"
              id="sort_by"
              value={search}
            >
              <option value="created_at">Date Created</option>
              <option value="article_id"> Article ID</option>
              <option value="author">Author</option>
              <option value="comment_count">Comment Count</option>
              <option value="title">Title</option>
              <option value="votes">Votes</option>
            </select>
          </div>

          <div>
            <label>Articles per page: </label>
            <select
              className="Select"
              onChange={(event) => {
                setLimit(+event.target.value);
              }}
              name="page"
              id="page"
              value={limit}
            >
              <option value="10">10</option>
              <option value="15"> 15</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="ASC/DESC">
            <button
              className="selectButton"
              disabled={disableASC}
              onClick={() => {
                setOrder("asc");
                setDisableDESC(false);
                setDisableASC(true);
              }}
            >
              ASC
            </button>
            <button
              className="selectButton"
              disabled={disableDESC}
              onClick={() => {
                setOrder("desc");
                setDisableDESC(true);
                setDisableASC(false);
              }}
            >
              DESC
            </button>
          </div>

          <ul className="sectionListOfArticles">
            {articles.map((article, index) => {
              return (
                <li key={index} className="listOfArticles">
                  <Link to={`/articles/${article.article_id}`}>
                    {article.title}
                  </Link>
                  <p>Topic : {article.topic}</p>
                  <p>Author : {article.author}</p>
                </li>
              );
            })}
          </ul>
          <div>
            <button
              disabled={page === 1}
              className="selectButton"
              onClick={() => {
                setPage(page - 1);
              }}
            >
              Previous Page
            </button>
            <p>Page : {page}</p>
            <button
              disabled={articles.length < limit}
              className="selectButton"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Next Page
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ArticlesList;
