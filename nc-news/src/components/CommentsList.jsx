import { useEffect, useState } from "react";
import * as api from "../api";

function CommentsList({ article_id }) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    api.getArticleCommentsById(article_id).then((commentsAPI) => {
      setComments(commentsAPI);
    });
  }, []);

  return (
    <section className="commentsList">
      <ul className="listOfComments">
        {comments.map((comment, index) => {
          return (
            <li key={index} className="SingleComment">
              <ul className="SingleCommentData">
                <li>Created by : {comment.author}</li>
                <li>
                  Created at : {new Date(comment.created_at).toDateString()}
                </li>
              </ul>
              <p className="SingleCommentContent">{comment.body}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CommentsList;
