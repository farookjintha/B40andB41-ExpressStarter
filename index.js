require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./db/connect');

//Importing Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/users.routes');
const productRoutes = require('./routes/products.routes');

const app = express();

app.use(express.json());
app.use(cookieParser());

//Connecting DB
db();

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use(authRoutes)
app.use(userRoutes);
app.use(productRoutes);

const PORT  = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`App is running on PORT ${PORT}`);
})