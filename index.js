require('dotenv').config();

const express = require('express');
const userRoutes = require('./routes/users.routes');
const productRoutes = require('./routes/products.routes');
const db = require('./db/connect');
const app = express();

app.use(express.json());

//Connecting DB
db();


app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use(userRoutes);
app.use(productRoutes);

const PORT  = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
})


//GET - To read -> /users or /users/:userId
//POST - To insert or add -> /users or /domains/:domainId/users -> req.body
//PUT - To update -> /users/:userId  -> req.body
//DELETE - To Delete -> /users or /users/:userId