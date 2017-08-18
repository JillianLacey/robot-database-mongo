const express = require("express");
const path = require("path");
const mustacheExpress = require("mustache-express");


const app = express();
const data = require("./data")
const port = process.env.PORT || 8003;


app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.use(express.static('public'));
app.set("view engine", "mustache");


app.get("/", (req, res) => {
    res.render("index", { users: data.users });
});

app.get("/:id", (req, res) => {
    let userId = req.params.id;
    let user = data.users.find(user => user.id === parseInt(userId));
    res.render("profile", user);
});


app.listen(port, () => {
    // console.log(`Server is running on port ${port}!`);
});
