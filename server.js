const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");


const app = express();
const data = require("./data")
const port = process.env.PORT || 8000;


app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.use(express.static('public'));
app.set("view engine", "mustache");


app.get("/", (req, res) => {
    res.render("index", { users: data.users });
});


app.listen(port, () => {
    // console.log(`Server is running on port ${port}!`);
});
