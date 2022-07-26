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

export function getArticles(page) {
  return ncNewsAPI
    .get("/api/articles", {
      params: {
        p: page,
      },
    })
    .then(({ data }) => {
      console.log(data);
      return data.articles;
    });
}

export function getArticleById(article_id) {
  return ncNewsAPI.get(`/api/articles/${article_id}`).then(({ data }) => {
    console.log(data);
    return data.article;
  });
}
