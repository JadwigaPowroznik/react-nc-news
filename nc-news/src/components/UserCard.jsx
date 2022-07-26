const UserCard = ({user}) => {

    return ( 
     
<div className="user">
<h3>{user.username} </h3> 
<p><img src={user.avatar_url} height="150"/></p>
</div>

     );
}
 
export default UserCard;