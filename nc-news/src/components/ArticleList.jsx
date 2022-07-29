import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import * as api from "../api";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    api.getArticles(page, topic).then((articlesAPI) => {
      if (articlesAPI.length === 0 && topic === undefined) {
        setArticles("No Articles Found!");
        setError(null);
        setIsLoading(false);
      } else if (articlesAPI.length === 0 && topic !== undefined) {
        setArticles(`No articles found for ${topic} topic!`);
        setError(null);
        setIsLoading(false);
      } else {
        setArticles(articlesAPI);
        setError(null);
        setIsLoading(false);
      }
    });
  }, [page, topic]);

  let h2 = <h2>Articles :</h2>;

  if (topic !== undefined) {
    h2 = <h2>{topic} articles :</h2>;
  }

  if (typeof error === "string") {
    return <p>{error}</p>;
  } else {
    return (
      <section>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="sectionListOfArticles">
            {h2}

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
                disabled={articles.length < 10}
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
}

export default ArticlesList;
