const express = require('express');
const app = express();

const port = 8080;
app.get("/welcome", function(req, res) {
    res.send("welcome to my server");
});

app.listen( port, function() {
    console.log("server is ready at port" + port);
});