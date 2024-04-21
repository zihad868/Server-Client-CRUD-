import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Users = () => {
  const loderUsers = useLoaderData();
  const [users, setUsers] = useState(loderUsers);

  const handleDelete = (id) => {
    console.log("Delete ",id)
    fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if(data.deletedCount > 0){
            alert("User Remove Successful");
            const remaining = users.filter(user => user._id !== id);
            setUsers(remaining);
        }
      })
  }
  return (
    <div>
      <p>User: {users.length}</p>
      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name} : {user.email} : {user._id} 
            <Link to={`/users/${user._id}`}>
              <button>Update</button>
            </Link>
            <button
             onClick={() => handleDelete(user._id)}
            >X</button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
