import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import * as api from "../api";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    api.getArticles(page).then((articlesAPI) => {
      setArticles(articlesAPI);
      setIsLoading(false);
    });
  }, [page]);

  return (
    <section>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="sectionListOfArticles">
          <h2>Articles :</h2>
          <ul className="sectionListOfArticles">
            {articles.map((article, index) => {
              return (
                <li key={index} className="listOfArticles">
                  <Link to={`/api/articles/${article.article_id}`}>
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
              className="selectPage"
              onClick={() => {
                setPage(page - 1);
              }}
            >
              Previous Page
            </button>
            <p>Page : {page}</p>
            <button
              disabled={articles.length < 10}
              className="selectPage"
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
