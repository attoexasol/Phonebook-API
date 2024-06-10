const express = require("express");
const adminRouter = require("./routers/adminRouter");
const userRouter = require("./routers/userRouter");
const app = express();


//App level middleware:
app.use(express.json());


//Use Routers in App:
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
    res.send({"Content": "Hello World!", "Organization": "AttoExa Solution"});
});


module.exports = app;