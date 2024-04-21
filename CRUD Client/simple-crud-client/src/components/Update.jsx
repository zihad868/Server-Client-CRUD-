import { useLoaderData } from "react-router-dom";

const Update = () => {
    const loadedUser = useLoaderData();
    
    const handleUpdate = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        console.log(name, email);
        const updateUser = {name, email};

        fetch(`http://localhost:5000/users/${loadedUser._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateUser)
        })
           .then(res => res.json())
           .then(data => {
              console.log(data);
           })
    }

    return (
        <div>
            <h2>Update User {loadedUser.name}</h2>
            <form onSubmit={handleUpdate}>
                <input type="text" name="name" defaultValue={loadedUser.name}/> <br />
                <input type="text" name="email" defaultValue={loadedUser.email}/> <br />
                <input type="submit" value="Update" />
            </form>
        </div>
    );
};

export default Update;