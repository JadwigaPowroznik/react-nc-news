import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api";

function ArticlesListByTopic() {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    api.getArticles().then((articlesAPI) => {
      setArticles(articlesAPI);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    api.getTopics().then((topicsAPI) => {
      setTopics(topicsAPI);
      setIsLoading(false);
    });
  }, []);
  ////////////
  let articlesByTopic = articles.filter((article) => {
    if (article.author === user.username) {
      return article;
    }
  });
  let h3 = <h3>Your current articles :</h3>;
  if (articlesByUser.length === 0) {
    h3 = <h3>No articles found!</h3>;
  }

  return (
    <section>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {h3}
          <ul className="listOfArticlesByUser">
            {articlesByUser.map((article, index) => {
              return (
                <li key={index} className="listOfArticlesByUserLI">
                  <Link to={`/api/articles/${article.article_id}`}>
                    {article.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}

export default ArticlesListByTopic;
