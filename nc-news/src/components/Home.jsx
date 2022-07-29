import { useContext } from "react";
import { UserContext } from "../contexts/User";
import ArticlesListByUser from "./ArticlesListByUser";

function Home() {
  const { user } = useContext(UserContext);

  return (
    <section className="home">
      <h2>Welcome {user.username}!</h2>
      <main className="homemain">
        <p>
          <img src={user.avatar_url} alt="User Avatar" height="150" />
        </p>
      </main>
      <ArticlesListByUser />
    </section>
  );
}

export default Home;
