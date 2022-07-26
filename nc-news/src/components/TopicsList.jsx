import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from "../api";

function TopicsList() {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    api.getTopics().then((topicsAPI) => {
      console.log(topicsAPI);
      setTopics(topicsAPI);
    });
  }, []);

  return (
    <section className="topicsList">
      <h3>List of available article topics :</h3>
      <ul className="listOfTopics">
        {topics.map((topic, index) => {
          return (
            <li className="listOfTopicsLI" key={index}>
              <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default TopicsList;
