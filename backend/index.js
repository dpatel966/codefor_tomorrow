const express = require('express');
const path = require('path');
const userRoutes = require('./routes/user'); 
const cors = require('cors');



const server = express();

server.use(cors())
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/user', userRoutes);

server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

server.listen(8989, () => {
    console.log('Server is running on port 8989');
});
