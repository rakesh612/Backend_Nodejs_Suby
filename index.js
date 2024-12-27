// JSON (JavaScript Object Notation) is widely used in web development because it provides a lightweight, human-readable format for 
// transferring data between a server and a web application, making it easy for both machines and developers to parse and 
// interpret complex data structures, especially when interacting with APIs and building dynamic web experiences; 
// essentially, it simplifies data exchange across different programming languages and systems while being easily processed
//  by JavaScript on the client-side.
const express = require('express');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const http = require('http');
const path = require('path');

const app = express();

const port = process.env.PORT || 4001;

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected successfully"))
.catch((err)=> console.log(err))

//to convert input values into json format
app.use(bodyParser.json());
// middleware =  A request handler with access to the application's request-response cycle 
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.use('uploads',express.static('uploads'))

const server = http.createServer(app);
server.listen(port, (err) => {
    if (err) {
        console.error('Error starting server:', err);
        return;
    }
    console.log(`Server is running on port ${port}`);
});

// Handle 'EADDRINUSE' error
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is in use. Trying another one...`);
        server.listen(0); // Automatically try another available port
    }
});


app.use('/',(req,res)=>{
    res.send("<h1>Welcome to SUBY</h1>")
})