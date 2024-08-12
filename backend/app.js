const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors());

const connectDB = require('./config/DBconnect');

const user = require('./routes/User');
const blog = require('./routes/Routes');
const admin = require('./routes/Admin');



app.use(express.json());

app.use('/user', user);
app.use('/blog', blog);
app.use('/admin', admin);

app.get('/', (req, res) => {
    res.send('Hello World!');
})
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
