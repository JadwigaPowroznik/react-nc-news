import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getUsers } from "../api";
import { UserContext } from "../contexts/User";

function UserChange() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
    getUsers().then((usersAPI) => {
      setUsers(usersAPI);
      setIsLoading(false);
    });
  }, []);

  return (
    <section className="sectionlistOfUsers">
      <h2>Select a user:</h2>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <ul className="listOfUsersUl">
          {users.map((user, index) => {
            return (
              <li key={index} className="listOfUsers">
                <h3>{user.username}</h3>
                <img
                  src={user.avatar_url}
                  className="listOfUsersimage"
                  height="150"
                />
                <p>
                  <Link to="/">
                    <button
                      className="selectButton"
                      onClick={() => {
                        setUser(user);
                      }}
                    >
                      select
                    </button>
                  </Link>
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default UserChange;
