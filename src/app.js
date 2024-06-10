const express = require("express");
const app = express();


//App level middleware:

app.get('/', (req, res) => {
    res.send({"Content": "Hello World!", "Organization": "AttoExa Solution"});
})


module.exports = app;