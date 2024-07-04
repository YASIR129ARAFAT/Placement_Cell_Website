const dotenv = require('dotenv')
const cors = require('cors')
// const cookieParser = require('cookie-parser');
// const fs = require('fs')
const express = require('express');
const path = require('path');


const server = express();
dotenv.config({
    path: path.resolve(__dirname, '../.env')
});


const { dbConnection } = require('./db/connection.db.js')
const { authMiddleware } = require('./middlewares/auth.middleware.js')
const {isAdminMiddleware} = require('./middlewares/isAdmin.middleware.js')

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

const { userRoute } = require('./routes/user.route.js')
const { authRoute } = require('./routes/auth.route.js');
const { AnnouncementsRouter } = require('./routes/announcements.route.js');
const { CommentsRouter } = require('./routes/comments.route.js');
const { OpeningsRouter } = require('./routes/openings.route.js');
const { SelectionRouter } = require('./routes/selections.route.js');
const { BranchRouter } = require('./routes/branch.route.js');


//router declaration
server.use('/auth', authRoute);
server.use('/api/user',authMiddleware, userRoute);
server.use('/api/announcements', authMiddleware, AnnouncementsRouter); // this is route for both all announcements and results
server.use('/api/comments',authMiddleware, CommentsRouter); //comments route
server.use('/api/opening',OpeningsRouter)
server.use('/api/selection',SelectionRouter)
server.use('/api/selection',SelectionRouter)
server.use('/api/branch',BranchRouter)


// -------------------DEployment code------

const __dirname1 = path.resolve()
if(process.env.NODE_ENV === 'production'){
    server.use(express.static(path.join(__dirname1,"/frontend/dist")))
    server.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"frontend","dist","index.html"))
    })
}
// -------------------



server.listen(process.env.PORT, (error) => {
    console.log('server started..' + process.env.PORT)
})


