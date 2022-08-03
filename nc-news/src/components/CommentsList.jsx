import { useEffect, useState, useContext } from "react";
import * as api from "../api";
import { UserContext } from "../contexts/User";

function CommentsList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [body, setBody] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState("");
  const [deleting, setDeleting] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    api.getArticleCommentsById(article_id, 10, page).then((commentsAPI) => {
      setComments(commentsAPI);
    });
  }, [article_id, page]);

  useEffect(() => {
    if (typeof selectedCommentId === "number") {
      setDeleting(true);
      api.deleteCommentById(selectedCommentId).then(() => {
        setDeleting(false);
        window.location.reload();
      });
    }
  }, [selectedCommentId, article_id]);

  let copyCommentsAPI = [...comments];

  const handleSubmit = (event) => {
    setDisableButton(true);
    event.preventDefault();

    api
      .postCommentByArticleId(article_id, {
        username: user.username,
        body: body,
      })
      .then((newComment) => {
        setBody("");
        newComment.created_at = Date.now();
        copyCommentsAPI.push(newComment);
        setComments(copyCommentsAPI);
        //window.location.reload();
      });
  };

  return (
    <section className="commentsList">
      <ul className="listOfComments">
        <form className="CommentForm" onSubmit={handleSubmit}>
          <input
            placeholder="Comment"
            className="CommentFormInputs"
            type="text"
            id="comment"
            onChange={(event) => setBody(event.target.value)}
            value={body}
            disabled={disableButton}
          />
          <button
            className="selectButton"
            type="submit"
            disabled={disableButton || body === ""}
          >
            Post Comment
          </button>
        </form>
        {comments.map((comment, index) => {
          return (
            <li key={index} className="SingleComment">
              <ul className="SingleCommentData">
                <li>Created by : {comment.author}</li>
                <li>
                  Created at : {new Date(comment.created_at).toDateString()}
                </li>
                <li>
                  <button
                    disabled={
                      comment.author !== user.username ||
                      comment.comment_id === selectedCommentId
                    }
                    className="selectButton"
                    onClick={() => {
                      setSelectedCommentId(comment.comment_id);
                    }}
                  >
                    {comment.comment_id === selectedCommentId
                      ? "Comment Deleted"
                      : "Delete Comment"}
                  </button>
                </li>
              </ul>
              {deleting && comment.comment_id === selectedCommentId ? (
                <p>deleting...</p>
              ) : (
                <p className="SingleCommentContent">{comment.body}</p>
              )}
            </li>
          );
        })}
        <div className="commentsPage">
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
            disabled={comments.length < 10}
            className="selectButton"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next Page
          </button>
        </div>
      </ul>
    </section>
  );
}

export default CommentsList;
