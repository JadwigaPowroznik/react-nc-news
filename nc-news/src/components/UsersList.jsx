// import { useEffect, useState } from "react";
// import UserCard from "./UserCard";
// import * as api from "../api";

// function UsersList() {
//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     api.getUsers().then((usersAPI) => {
//       setUsers(usersAPI);
//     });
//   }, []);

//   return (
//     <section className="usersList">
//       <h2 className="listOfUsers">List of users :</h2>
//       <ul className="listOfUsers">
//         {users.map((user, index) => {
//           return (
//             <li key={index}>
//               <UserCard user={user} />
//             </li>
//           );
//         })}
//       </ul>
//     </section>
//   );
// }

// export default UsersList;
