const express = require('express');
const cors = require('cors'); // Import cors middleware
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middleware 
app.use(cors());
app.use(express.json());

//zihadh868
//zPLTfJnz8q9aXQsN



const uri = "mongodb+srv://zihadh868:zPLTfJnz8q9aXQsN@cluster0.cual1m3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const database = client.db("usersDB");
    const databaseCollection = database.collection("users");

    app.get('/users', async(req, res) => {
      const cursor = databaseCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/users', async(req, res) => {
      const user = req.body;
      console.log(user);
      const result = await databaseCollection.insertOne(user);
      res.send(result);
    })

    // Update
    app.get('/users/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const user = await databaseCollection.findOne(query);
      res.send(user);
    })


    app.put('/users/:id', async(req, res) => {
      const id = req.params.id;
      const user = req.body;
      console.log(user);

      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true}
      const updateUser = {
        $set: {
          name: user.name,
          email: user.email
        }
      }

      const result = await databaseCollection.updateOne(filter, updateUser, options)
      res.send(result)
    })

    app.delete('/users/:id', async(req, res) => {
      const id = req.params.id;
      console.log("Please Delete User Id: ", id)

      const query = {_id: new ObjectId(id)}

      const result = await databaseCollection.deleteOne(query);
      res.send(result);
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Simple CRUD Application");
})

app.listen(port, () => {
    console.log("Server listen on port", port);
})
