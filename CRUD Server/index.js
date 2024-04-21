const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());

// zihad86
// g24Hlnf8Jml

app.get('/', (req, res) => {
    res.send('Server is running ...');
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})