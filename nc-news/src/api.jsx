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

export function getArticles(page, topic) {
  return ncNewsAPI
    .get("/api/articles", {
      params: {
        p: page,
        topic: topic,
        // limit: limit,
      },
    })
    .then(({ data }) => {
      return data.articles;
    });
}

export function getArticleById(article_id) {
  return ncNewsAPI.get(`/api/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
}

export function getArticleCommentsById(article_id) {
  return ncNewsAPI
    .get(`/api/articles/${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    });
}

export function patchArticleById(article_id, inc_votes) {
  return ncNewsAPI.patch(`/api/articles/${article_id}`, inc_votes);
}
