import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { TopicsContext } from "../contexts/Topics";
import "./componentsCSS/Dropdown.css";

function Dropdown() {
  const { topics } = useContext(TopicsContext);
  const [click, setClick] = useState(false);

  let menuItems = [{ topic: "All", path: "/articles", name: "dropdown-link" }];

  const handleClick = () => setClick(true);

  topics.forEach((top) => {
    let topic = top.slug;
    menuItems.push({
      topic: `${topic}`,
      path: `/topics/${topic}`,
      name: "dropdown-link",
    });
  });

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {menuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.name}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.topic}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
