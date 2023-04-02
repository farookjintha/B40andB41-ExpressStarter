const express = require('express');
const userRoutes = require('./routes/users.routes');
const productRoutes = require('./routes/products.routes');

const app = express();
app.use(express.json());

app.use(userRoutes);
app.use(productRoutes);

app.listen(4000, () => {
    console.log('App is running on port 4000');
})


//GET - To read -> /users or /users/:userId
//POST - To insert or add -> /users or /domains/:domainId/users -> req.body
//PUT - To update -> /users/:userId  -> req.body
//DELETE - To Delete -> /users or /users/:userId