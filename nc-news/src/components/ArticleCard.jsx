import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api";
import CommentsList from "./CommentsList";

const ArticleCard = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [votes, setVotes] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api.getArticleById(article_id).then((articleAPI) => {
      setArticle(articleAPI);
      setVotes(articleAPI.votes);
      setIsLoading(false);
    });
  }, [article_id]);

  function incrementVotes() {
    setVotes((currentVotes) => currentVotes + 1);
  }

  function decrementVotes() {
    setVotes((currentVotes) => currentVotes - 1);
  }

  function updateVotes(inc) {
    api.patchArticleById(article_id, {
      inc_votes: inc,
    });
  }

  if (article.length === 0 && isLoading === false) {
    return <section>No article found!</section>;
  } else {
    return (
      <section>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="sectionarticleCardTitle">
            <div className="articleCard">
              <h2 className="articleCardTitle">{article.title}</h2>
              <div className="articleCardBody">
                <div className="articleCardBodyData">
                  <p>Author : {article.author}</p>
                  <p>Topic : {article.topic}</p>
                  <p>
                    Date Created : {new Date(article.created_at).toDateString()}
                  </p>
                </div>
                <p>{article.body}</p>
              </div>

              <div className="commentsButtons">
                <div>
                  <div className="showMenu">
                    <button
                      className="selectButton"
                      onClick={() => {
                        setIsOpen((currentOpeness) => !currentOpeness);
                      }}
                    >
                      Comments ({article.comment_count})
                    </button>
                  </div>
                  {isOpen && <CommentsList article_id={article_id} />}
                </div>
                <div className="votesButton">
                  <button
                    className="selectButton"
                    onClick={() => {
                      incrementVotes();
                      updateVotes(1);
                    }}
                  >
                    +
                  </button>
                  <p>Votes({votes})</p>
                  <button
                    disabled={votes === 0}
                    className="selectButton"
                    onClick={() => {
                      decrementVotes();
                      updateVotes(-1);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }
};

export default ArticleCard;
