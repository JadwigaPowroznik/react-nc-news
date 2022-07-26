import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import * as api from "../api";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [diablePreviousButton, setPreviousButton] = useState(true);
  const [diableNextButton, setNextButton] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    api.getArticles(page).then((articlesAPI) => {
      setArticles(articlesAPI);
      setIsLoading(false);
      if (page === 1) {
        setPreviousButton(true);
      } else {
        setPreviousButton(false);
      }
    });
  }, [page]);

  let currentArticles = [...articles];
  console.log(currentArticles.length, "<outside atricles");

  function handlePageButtons(currentArticles) {
    console.log(currentArticles.length, "<<<<");
    if (articles.length === 0 || articles.length < 10) {
      setNextButton(true);
    } else {
      setNextButton(false);
    }
  }

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
              disabled={diablePreviousButton}
              className="selectPage"
              onClick={() => {
                handlePageButtons(articles);
                setPage(page - 1);
              }}
            >
              Previous Page
            </button>
            <p>Page : {page}</p>
            <button
              disabled={diableNextButton}
              className="selectPage"
              onClick={() => {
                handlePageButtons(articles);
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
