const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const fs = require('fs')
const express = require('express');
const path = require('path');


const server = express();
dotenv.config({
    path: '../.env'
})


const { dbConnection } = require('./db/connection.db.js')
const { authMiddleware } = require('./middlewares/auth.middleware.js')

//db connection
dbConnection().catch((err) => {
    console.log("db connectio failed \n", err);
});


server.use(cors()) // you can pass options as well in cors

server.use(express.json());

// we are not using any cookies
// server.use(cookieParser({
//     credentials: true,
//     httpOnly: true,
// }));
server.use(express.urlencoded({ extended: true }));
server.use(express.static('public'));


// routers import
const { productRoute } = require('./routes/product.route.js')
const { userRoute } = require('./routes/user.route.js')
const { authRoute } = require('./routes/auth.route.js');
const { AnnouncementsRouter } = require('./routes/announcements.route.js');
const { CommentsRouter } = require('./routes/comments.route.js');
const { OpeningsRouter } = require('./routes/openings.route.js');

//router declaration
server.use('/auth', authRoute);
server.use('/api/product', authMiddleware, productRoute);
server.use('/api/user',authMiddleware, userRoute);
server.use('/api/announcements', authMiddleware, AnnouncementsRouter); // this is route for both all announcements and results
server.use('/api/comments',authMiddleware, CommentsRouter); //comments route
server.use('/api/opening',authMiddleware,OpeningsRouter)


server.listen(process.env.PORT, (error) => {
    console.log('server started..' + process.env.PORT)
})


