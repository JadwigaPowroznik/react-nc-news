// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import * as api from "../api";

// function ArticleListByTopic() {
//   const { topic } = useParams();
//   const [articles, setArticles] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setIsLoading(true);
//     api.getArticles().then((articlesAPI) => {
//       setArticles(articlesAPI);
//       setIsLoading(false);
//     });
//   }, [topic]);

//   let articlesByTopic = articles.filter((article) => {
//     if (article.topic === topic) {
//       return article;
//     }
//   });

//   let h3 = <h3>{topic} articles :</h3>;
//   if (articlesByTopic.length === 0 && isLoading === false) {
//     h3 = <h3>No articles found for {topic} topic!</h3>;
//   }

//   return (
//     <section className="sectionlistOfArticlesByTopic">
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           {h3}
//           <ul className="listOfArticlesByTopic">
//             {articlesByTopic.map((article, index) => {
//               return (
//                 <li key={index} className="listOfArticlesByTopicLI">
//                   <Link to={`/api/articles/${article.article_id}`}>
//                     {article.title}
//                   </Link>
//                   <p>Author : {article.author}</p>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       )}
//     </section>
//   );
// }

// export default ArticleListByTopic;
