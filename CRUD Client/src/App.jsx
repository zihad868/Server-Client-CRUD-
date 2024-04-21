import './App.css'

function App() {
  const handleUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;

    const user = {name, email};
    console.log(user)
    
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user)
    })
       .then(res => res.json())
       .then(data => {
         console.log(data)
         if(data.insertedId){
          alert("User Add successfully");
          e.target.reset();
         }
       })
  }
  return (
    <>
      <h1>CRUD Application</h1>
      <form onSubmit={handleUser}>
        <input type="text" name="name" placeholder='Name' /> <br />
        <input type="text" name='email' placeholder='Email' /> <br />
        <input type="submit" value="Add User" />
      </form>
    </>
  )
}

export default App
