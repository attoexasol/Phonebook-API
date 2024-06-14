const express = require("express");
const adminRouter = require("./routers/adminRouter");
const userRouter = require("./routers/userRouter");
const bodyParser = require("body-parser");
const app = express();


//App level middleware:
app.use(express.json());


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Use Routers in App:
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

app.get('/', (req, res) => {
    res.send({"Content": "Hello World!", "Organization": "AttoExa Solution"});
});


// Global Error Handling
app.use((err, req, res, next) => {
    return errorResponse(res, {
      statusCode: err.status || 500,
      message: err.message || "There is an error on the server.",
    });
  });


module.exports = app;