import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api";

const ArticleCard = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    api.getArticleById(article_id).then((articleAPI) => {
      setArticle(articleAPI);
      setIsLoading(false);
    });
  }, [article_id]);

  if (article.length === 0) {
    return <section>No article found!</section>;
  } else {
    return (
      <section>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="article">
            <h2>{article.title}</h2>
            <p>Author : {article.author}</p>
            <p>Topic : {article.topic}</p>
            <p>Date Created : {article.created_at}</p>
            <p>Comment Count : {article.comment_count}</p>
            <p>Votes : {article.votes}</p>
            <p>{article.body}</p>
          </div>
        )}
      </section>
    );
  }
};

export default ArticleCard;
