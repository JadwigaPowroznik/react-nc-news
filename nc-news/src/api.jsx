import axios from "axios";

const ncNewsAPI = axios.create({
  baseURL: "https://news-nc-jadwiga.herokuapp.com",
});

export function getUsers() {
  return ncNewsAPI.get("/api/users").then(({ data }) => {
    return data.users;
  });
}

export function getTopics() {
  return ncNewsAPI.get("/api/topics").then(({ data }) => {
    return data.topics;
  });
}

export function getArticles(page, topic, limit, order, sort_by) {
  return ncNewsAPI
    .get("/api/articles", {
      params: {
        p: page,
        topic: topic,
        limit: limit,
        order: order,
        sort_by: sort_by,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
}

export function getArticleById(article_id) {
  return ncNewsAPI
    .get(`/api/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    })
    .catch(function (error) {
      if (error.response) {
        return error.response.data;
      }
    });
}

export function getArticleCommentsById(article_id, limit, page) {
  return ncNewsAPI
    .get(`/api/articles/${article_id}/comments`, {
      params: {
        p: page,
        limit: limit,
      },
    })
    .then(({ data }) => {
      return data.comments;
    });
}

export function patchArticleById(article_id, inc_votes) {
  return ncNewsAPI.patch(`/api/articles/${article_id}`, inc_votes);
}

export function postCommentByArticleId(article_id, newComment) {
  return ncNewsAPI
    .post(`/api/articles/${article_id}/comments`, newComment)
    .then(({ data }) => {
      return data.comment;
    });
}

export function deleteCommentById(comment_id) {
  return ncNewsAPI.delete(`/api/comments/${comment_id}`).then(({ data }) => {
    return data;
  });
}
